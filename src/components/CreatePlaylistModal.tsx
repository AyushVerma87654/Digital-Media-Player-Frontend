import { FC, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { addPlaylistInitiatedAction } from "../redux/slice/playlistSlice";
import { userSelector } from "../redux/selectors/userSelector";
import { AppState } from "../redux/store";
import Button from "../components/Button";
import Input from "../components/Input";
import { AudioContentType } from "../models/recentlyPlayed";

interface Props extends ReduxProps {
  onClose: () => void;
}

const CreatePlaylistModal: FC<Props> = ({ onClose, createPlaylist, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [contentType, setContentType] = useState<AudioContentType>(
    AudioContentType.TRACK
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-96">
        <h2 className="text-lg font-semibold text-white mb-4">
          Create Playlist
        </h2>

        {/* Playlist Name */}
        <Input
          name="title"
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 bg-gray-800 border-gray-700 text-white"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className="
            w-full mb-4 p-3 rounded-md resize-none
            bg-gray-800 border-2 border-gray-700 text-white
            focus:outline-none focus:border-blue-500
          "
        />

        {/* Content Type */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Content type</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="contentType"
                value={AudioContentType.TRACK}
                checked={contentType === AudioContentType.TRACK}
                onChange={() => setContentType(AudioContentType.TRACK)}
                className="accent-orange-500"
              />
              Tracks
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="radio"
                name="contentType"
                value={AudioContentType.PODCAST}
                checked={contentType === AudioContentType.PODCAST}
                onChange={() => setContentType(AudioContentType.PODCAST)}
                className="accent-orange-500"
              />
              Podcasts
            </label>
          </div>
        </div>

        {/* Public Toggle */}
        <label className="flex items-center gap-2 text-sm text-gray-300 mb-5">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="accent-orange-500"
          />
          Make playlist public
        </label>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!name.trim()}
            onClick={() => {
              createPlaylist({
                playlist: {
                  title: name.trim(),
                  description: description.trim() || undefined,
                  isPublic,
                  userId: user.id,
                  contentType,
                },
              });
              onClose();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapState = (state: AppState) => ({
  user: userSelector(state),
});

const mapDispatch = {
  createPlaylist: addPlaylistInitiatedAction,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CreatePlaylistModal);
