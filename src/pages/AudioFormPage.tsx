import { FC } from "react";
import { useParams } from "react-router-dom";
import AudioForm from "../components/AudioForm";

const AudioFormPage: FC = () => {
  const { type, task, id } = useParams<{
    type: "track" | "podcast";
    task: "add" | "edit";
    id: string;
  }>();

  if (!type || !task || !id) return null;

  return <AudioForm type={type} task={task} entityId={id} />;
};

export default AudioFormPage;
