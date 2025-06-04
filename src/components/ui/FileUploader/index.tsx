import React from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineAutoDelete, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

import { cn } from "@/lib/utils";
import { useLoadFileMutation } from "@/store/features/pet/petApi";

import { Button } from "../button";

import styles from "./style.module.scss";

type Props = {
  petId: number | null;
  refetch: () => void;
  className?: string;
};

const FILE_FORMATERS = {
  "image/*": [".jpeg", ".png"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const FileUploader = ({ petId, refetch, className }: Props) => {
  const [loadFile, { isLoading }] = useLoadFileMutation();
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleUpload = React.useCallback(async () => {
    if (!selectedFiles.length || !petId) throw new Error("Чего-то не хватает");

    try {
      for (const file of selectedFiles) {
        const base64Content = await readFileAsBase64(file);

        const payload = {
          fileName: file.name,
          fileType: "ANALYZE",
          content: base64Content,
          petId,
        };

        await loadFile(payload).unwrap();
      }

      await refetch();

      toast.success("Файлы успешно загружены", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setSelectedFiles([]);
    } catch {
      toast.error("Что-то пошло не так", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [selectedFiles, petId, loadFile]);

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: FILE_FORMATERS,
    maxFiles: 5,
    multiple: true,
  });

  React.useEffect(() => {
    if (fileRejections.length) {
      toast.error("Недопустимы формат файла", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [fileRejections]);

  return (
    <div className={cn(className, styles.file__upload__container)}>
      <div {...getRootProps()} className={styles.file__uploader}>
        <input {...getInputProps()} />

        <p>Прикрепите файлы формата .jpeg .png .pdf .doc .docx</p>
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.files__preview__container}>
          <h4>Выбранные файлы:</h4>
          <ul className={styles.files__list}>
            {selectedFiles.map((file, index) => (
              <li key={index} className={styles.file__item}>
                <span>{`${index + 1}.`}</span>
                <span>{file.name}</span>
                <span>{(file.size / 1024).toFixed(2)} KB</span>

                {isLoading ? (
                  <MdOutlineAutoDelete size={21} className={styles.basket__loading} />
                ) : (
                  <MdOutlineDelete
                    size={21}
                    className={styles.basket}
                    onClick={() => removeFile(index)}
                  />
                )}
              </li>
            ))}
          </ul>

          <Button className="w-36 !mt-4" onClick={handleUpload} disabled={isLoading}>
            Отправить
          </Button>
        </div>
      )}
    </div>
  );
};

// Todo доработать*
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
