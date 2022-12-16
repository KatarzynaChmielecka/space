import { Field, useField } from 'formik';
import { useState } from 'react';

import classes from './ImageUpload.module.css';

// import Button from './Button';
interface Props {
  name: string;
  ref: string;
  meta: { ref: any };
  onFileUpload: (file: File) => void;
}
const ImageUpload: React.FC<Props> = ({ onFileUpload, ...props }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [field, meta, helpers] = useField(props);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    helpers.setValue(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <>
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Podgląd zdjęcia" />
          <br />
        </div>
      )}
      <label htmlFor="file">
        Wybierz plik:
        <input
          type="file"
          id="file"
          name={props.name}
          onChange={handleFileChange}
          ref={props.meta.ref}
        />
      </label>
      {meta.error && meta.touched && (
        <div style={{ color: 'red' }}>{meta.error}</div>
      )}
    </>
  );
};

export default ImageUpload;
