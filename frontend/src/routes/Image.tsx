import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../config";
import useAllImages from "../hooks/useAllImages";

const UploadImage: React.FC = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useAuth({
    elseFn: () => navigate("/login"),
  });

  const images = useAllImages({ limit: 10, page: page });

  const [file, setFile] = useState<File | null>(null);
  const [urlImg, setUrlImg] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("img", file); // Asegúrate de que 'img' coincida con el nombre en multer

    try {
      const response = await fetch(`${imageUrl}/upload`, {
        method: "POST",
        body: formData,
        credentials: "include", // Esto asegura que las cookies se envíen
      });

      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        setUrlImg(data.data.url);
      } else {
        console.error(data.message);
      }

      //   console.log('Imagen subida exitosamente:', data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Imagenes</h1>
      <form onSubmit={handleSubmit}>
        <h2>Subir imagen</h2>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Imagen</button>

        {urlImg && <img src={urlImg} alt="Uploaded Image" />}
      </form>

      <h2>Últimas imágenes subidas:</h2>
      <ul>
        {images.map((image) => (
          <li key={image._id}>
            <a href={`/image/${image._id}`}>
              <img
                src={image.url}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </a>
          </li>
        ))}
        <button onClick={() => setPage(page + 1)}>Cargar más imágenes</button>
      </ul>
    </div>
  );
};

export default UploadImage;
