import React, { useState } from "react";
import { IImage, TransformImageType } from "../types";
import { imageUrl } from "../config";

interface ImageTransformFormProps {
  imageId: string | undefined;
  setImage: (newImage: IImage | null) => void;
}

const ImageTransformForm: React.FC<ImageTransformFormProps> = ({
  imageId,
  setImage,
}) => {
  const [transformData, setTransformData] = useState<TransformImageType>({
    resize: { width: 0, height: 0 },
    crop: { width: 0, height: 0, x: 0, y: 0 },
    rotate: 0,
    format: "",
    filters: { grayscale: false, sepia: false },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setTransformData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${imageUrl}/${imageId}/transform`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transformData }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data.data);
      setImage(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Transform Image</h2>

      <div>
        <label>Width:</label>
        <input
          type="number"
          name="resize.width"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          name="resize.height"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Crop Width:</label>
        <input
          type="number"
          name="crop.width"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Crop Height:</label>
        <input
          type="number"
          name="crop.height"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Crop X:</label>
        <input type="number" name="crop.x" onChange={handleChange} required />
      </div>
      <div>
        <label>Crop Y:</label>
        <input type="number" name="crop.y" onChange={handleChange} required />
      </div>
      <div>
        <label>Rotate:</label>
        <input type="number" name="rotate" onChange={handleChange} />
      </div>
      <div>
        <label>Format:</label>
        <select name="format" onChange={handleChange}>
          <option value="">Select format</option>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          <option value="gif">GIF</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="filters.grayscale"
            onChange={handleChange}
          />
          Grayscale
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="filters.sepia" onChange={handleChange} />
          Sepia
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageTransformForm;
