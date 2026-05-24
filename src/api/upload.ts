import instance from "./axios";

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance
    .post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const audioUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance
    .post("/upload-audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
