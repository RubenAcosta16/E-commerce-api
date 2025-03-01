import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOneImage from "../hooks/useOneImage";

import TransformImage from "../components/TransformImage";
import { IImage } from "../types";
import { useAuth } from "../hooks/useAuth";

const OneImage: React.FC = () => {
  const navigate = useNavigate();

  useAuth({
    elseFn: () => navigate("/login"),
  });

  const { imgId } = useParams<{ imgId: string }>();
  const [image, setImage] = useState<IImage | null>(null);

  // const img = useOneImage(imgId ?? null);
  useOneImage(imgId ?? null, setImage);

  return (
    <div>
      {image && (
        <img
          src={image?.url}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
      )}

      <h2>Transform Image</h2>
      <form action=""></form>

      <TransformImage imageId={imgId} setImage={setImage}></TransformImage>
    </div>
  );
};

export default OneImage;

// import React from "react";
// import { useParams } from "react-router-dom";
// import useOneImage from "../hooks/useOneImage";

// import TransformImage from '../components/TransformImage';

// const OneImage: React.FC = () => {
//   const { imgId } = useParams<{ imgId: string }>();

//   const img = useOneImage(imgId ?? null);

//   return (
//     <div>
//       {img && (
//         <img src={img.url} alt="" style={{ width: "200px", height: "200px" }} />
//       )}

//       <h2>Transform Image</h2>
//       <form action=""></form>

//       <TransformImage imageId={imgId}></TransformImage>
//     </div>
//   );
// };

// export default OneImage;
