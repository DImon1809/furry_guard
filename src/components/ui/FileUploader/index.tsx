import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { useLoadFileMutation } from "@/store/features/pet/petApi";

import styles from "./style.module.scss";

type Props = {
  petId: nubmer;
};
// Todo доделать
export const FileUploader = ({ petId }: Props) => {
  const [loadFile] = useLoadFileMutation();

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Content = reader.result.split(",")[1];

      const payload = {
        fileName: file.name as string,
        fileType: "ANALYZE",
        content: base64Content as string,
        petId,
      };

      loadFile(payload)
        .unwrap()
        .then(() => {
          toast.success("Вы успешно авторизовались", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch(() => {
          toast.error("Неверный логин или пароль", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.file__uploader}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпустите справку для загрузки...</p>
      ) : (
        <p>Перетащите справку сюда или кликните, чтобы выбрать</p>
      )}
    </div>
  );
};
