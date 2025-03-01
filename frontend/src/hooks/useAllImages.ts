import { useState, useEffect } from "react";
import { imageUrl } from "../config";
import { IImage } from "../types";

interface Props {
  page: number | null;
  limit: number | null;
}

function useOneImage({ limit, page }: Props): IImage[] {
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${imageUrl}/?page=${page}&limit=${limit}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setImages((prevState) => [...prevState, ...data.data]); // Suponiendo que la respuesta contiene una propiedad `imageUrl`
        } else {
          setError(data.message || "Error fetching image");
          // alert(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("Error: " + error.message);
          console.error("Error:", error);
        } else {
          setError("An unknown error occurred");
          console.error("An unknown error occurred:", error);
        }
      }
    };

    if (limit && page) {
      fetchImage();
    }
  }, [limit, page]); // Dependencias

  if (error) {
    console.error(error);
  }

  return images; // Retorna la URL de la imagen o null
}

export default useOneImage;
