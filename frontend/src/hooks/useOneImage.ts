import { useState, useEffect } from "react";
import { imageUrl } from "../config";
import { IImage } from "../types";

function useOneImage(
  idSelected: string | null,
  setImage: (newImage: IImage | null) => void
): void {
  // const [image, setImage] = useState<IImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${imageUrl}/${idSelected}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setImage(data.data); // Suponiendo que la respuesta contiene una propiedad `imageUrl`
        } else {
          setError(data.message || "Error fetching image");
          alert(data.message);
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

    if (idSelected) {
      fetchImage();
    }
  }, [idSelected]); // Dependencias

  if (error) {
    console.error(error);
  }
}

export default useOneImage;
