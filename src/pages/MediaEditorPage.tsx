import { FC } from "react";
import { useParams } from "react-router-dom";
import MediaEditor from "../components/MediaEditor";

const MediaEditorPage: FC = () => {
  const { type, task, id } = useParams<{
    type: "track" | "podcast";
    task: "create" | "edit";
    id: string;
  }>();

  if (!type || !task || !id) return null;

  return <MediaEditor type={type} task={task} entityId={id} />;
};

export default MediaEditorPage;
