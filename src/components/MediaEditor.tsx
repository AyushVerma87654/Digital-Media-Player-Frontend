import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppState } from "../redux/store";
import {
  addTrackInitiatedAction,
  editTrackInitiatedAction,
} from "../redux/slice/trackSlice";
import {
  addPodcastInitiatedAction,
  editPodcastInitiatedAction,
} from "../redux/slice/podcastSlice";
import {
  uploadAudioInitiatedAction,
  uploadCoverImageInitiatedAction,
} from "../redux/slice/uploadSlice";
import {
  audioUrlSelector,
  coverImageUrlSelector,
  uploadLoadingSelector,
} from "../redux/selectors/uploadSelector";
import { selectedTrackSelector } from "../redux/selectors/trackSelector";
import { selectedPodcastSelector } from "../redux/selectors/podcastSelector";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiVideoUploadLine } from "react-icons/ri";
import FormikInput from "./FormikInput";
import Button from "./Button";
import {
  buildCreatePodcastPayload,
  buildCreateTrackPayload,
  buildEditPodcastPayload,
  buildEditTrackPayload,
} from "../utils/payloadBuilders";
import { userSelector } from "../redux/selectors/userSelector";
import { MediaEditorValues } from "../models/mediaEditor";

/* ================= TYPES ================= */

interface OwnProps {
  type: "track" | "podcast";
  task: "create" | "edit";
  entityId?: string;
}

interface Props extends OwnProps, ReduxProps {}

/* ================= VALIDATION ================= */

const getValidationSchema = (type: "track" | "podcast") =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    audioUrl: Yup.string().required("Audio file is required"),
    coverImageUrl: Yup.string().required("Cover image is required"),
    duration: Yup.number()
      .min(10, "Atleast 10 second audio is required")
      .required(),

    artist:
      type === "track"
        ? Yup.string().required("Artist is required")
        : Yup.string().nullable(),

    album:
      type === "track"
        ? Yup.string().required("Album is required")
        : Yup.string().nullable(),

    author:
      type === "podcast"
        ? Yup.string().required("Author is required")
        : Yup.string().nullable(),

    description:
      type === "podcast"
        ? Yup.string().required("Description is required")
        : Yup.string().nullable(),

    episodeTitle:
      type === "podcast"
        ? Yup.string().required("Episode title is required")
        : Yup.string().nullable(),

    episodeNumber: Yup.number().nullable(),
  });

/* ================= COMPONENT ================= */

const MediaEditor: FC<Props & FormikProps<MediaEditorValues>> = ({
  values,
  handleSubmit,
  setFieldValue,
  type,
  entityId,
  uploadImage,
  uploadAudio,
  uploadedCoverImageUrl,
  uploadedAudioUrl,
  uploadLoading,
}) => {
  useEffect(() => {
    if (
      uploadedCoverImageUrl &&
      uploadedCoverImageUrl !== values.coverImageUrl
    ) {
      setFieldValue("coverImageUrl", uploadedCoverImageUrl);
    }
  }, [uploadedCoverImageUrl, setFieldValue, values.coverImageUrl]);

  useEffect(() => {
    if (uploadedAudioUrl && uploadedAudioUrl !== values.audioUrl) {
      setFieldValue("audioUrl", uploadedAudioUrl);
    }
  }, [uploadedAudioUrl, setFieldValue, values.audioUrl]);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-3xl max-w-3xl mx-auto bg-white rounded-xl shadow p-8 space-y-6 border my-8"
    >
      <h2 className="text-2xl font-semibold text-center">
        {entityId === "0" ? "Create" : "Update"}{" "}
        {type === "track" ? "Track" : "Podcast"}
      </h2>

      {type === "track" && (
        <>
          <FormikInput name="title" label="Track Title" />
          <FormikInput name="artist" label="Artist" />
          <FormikInput name="album" label="Album" />
        </>
      )}

      {type === "podcast" && (
        <>
          <FormikInput name="title" label="Title" />
          <FormikInput name="episodeTitle" label="Episode Title" />
          <FormikInput name="author" label="Author" />
          <FormikInput name="description" label="Description" />
          <FormikInput
            name="episodeNumber"
            label="Episode Number"
            type="number"
          />
        </>
      )}

      <FormikInput name="duration" label="Duration (seconds)" type="number" />

      <FormikInput name="coverImageUrl" label="Cover Image URL" readOnly />

      {/* COVER IMAGE UPLOAD */}
      <div className="flex gap-4 flex-wrap">
        <label className="flex flex-col items-center justify-center px-4 py-4 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer w-40 text-center">
          <RiVideoUploadLine className="text-2xl mb-1" />
          <span className="text-sm font-medium">
            {uploadLoading.image ? "Uploading..." : "Upload Cover"}
          </span>
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploadLoading.image}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage({ file });
            }}
          />
        </label>

        {values.coverImageUrl && (
          <div className="relative flex flex-col items-center justify-center px-4 py-4 bg-green-50 border-2 border-dashed border-green-300 rounded-lg w-40 text-center">
            <button
              type="button"
              onClick={() => setFieldValue("coverImageUrl", "")}
              className="absolute top-1 right-1 text-red-500"
            >
              <IoMdCloseCircleOutline size={20} />
            </button>
            <FiCheckCircle className="text-green-500 text-xl mb-1" />
            <span className="text-xs truncate">Uploaded Cover</span>
          </div>
        )}
      </div>

      <FormikInput name="audioUrl" label="Audio URL" readOnly />

      {/* AUDIO UPLOAD */}
      <div className="flex gap-4 flex-wrap">
        <label className="flex flex-col items-center justify-center px-4 py-4 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer w-40 text-center">
          <RiVideoUploadLine className="text-2xl mb-1" />
          <span className="text-sm font-medium">
            {uploadLoading.audio ? "Uploading..." : "Upload Audio"}
          </span>
          <input
            type="file"
            accept="audio/*"
            hidden
            disabled={uploadLoading.audio}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAudio({ file });
            }}
          />
        </label>

        {values.audioUrl && (
          <div className="relative flex flex-col items-center justify-center px-4 py-4 bg-green-50 border-2 border-dashed border-green-300 rounded-lg w-40 text-center">
            <button
              type="button"
              onClick={() => setFieldValue("audioUrl", "")}
              className="absolute top-1 right-1 text-red-500"
            >
              <IoMdCloseCircleOutline size={20} />
            </button>
            <FiCheckCircle className="text-green-500 text-xl mb-1" />
            <span className="text-xs truncate">Uploaded Audio</span>
          </div>
        )}
      </div>

      <div className="mx-auto text-center">
        <Button
          type="submit"
          disabled={uploadLoading.audio || uploadLoading.image}
        >
          {entityId === "0" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

/* ================= REDUX ================= */

const mapStateToProps = (state: AppState) => ({
  editingTrack: selectedTrackSelector(state),
  editingPodcast: selectedPodcastSelector(state),
  uploadedCoverImageUrl: coverImageUrlSelector(state),
  uploadedAudioUrl: audioUrlSelector(state),
  uploadLoading: uploadLoadingSelector(state),
  userId: userSelector(state).id,
});

const mapDispatchToProps = {
  addTrack: addTrackInitiatedAction,
  editTrack: editTrackInitiatedAction,
  addPodcast: addPodcastInitiatedAction,
  editPodcast: editPodcastInitiatedAction,
  uploadImage: uploadCoverImageInitiatedAction,
  uploadAudio: uploadAudioInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

/* ================= FORMIK ================= */

const FormikHOC = withFormik<Props, MediaEditorValues>({
  mapPropsToValues: ({ type, editingTrack, editingPodcast }) => {
    if (type === "track" && editingTrack) return { ...editingTrack };
    if (type === "podcast" && editingPodcast) return { ...editingPodcast };

    return {
      title: "",
      artist: "",
      album: "",
      author: "",
      description: "",
      episodeTitle: "",
      episodeNumber: undefined,
      duration: 0,
      audioUrl: "",
      coverImageUrl: "",
    };
  },

  validationSchema: (props: Props) => getValidationSchema(props.type),

  handleSubmit: (values, { props }) => {
    const { type, task, entityId, userId } = props;

    if (type === "track") {
      if (task === "create") {
        const track = buildCreateTrackPayload(values, userId);
        props.addTrack({ track });
      } else {
        if (!entityId) return;
        const track = buildEditTrackPayload(values, entityId, userId);
        props.editTrack({ track });
      }
      return;
    }

    if (type === "podcast") {
      if (task === "create") {
        const podcast = buildCreatePodcastPayload(values, userId);
        props.addPodcast({ podcast });
      } else {
        if (!entityId) return;
        const podcast = buildEditPodcastPayload(values, entityId, userId);
        props.editPodcast({ podcast });
      }
    }
  },

  validateOnBlur: true,
  validateOnChange: true,
})(MediaEditor);

export default connector(FormikHOC);
