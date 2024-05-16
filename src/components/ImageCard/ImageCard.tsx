import { Image } from "../../types";
import css from "./ImageCard.module.css";
import { AiFillLike } from "react-icons/ai";

interface ImageCardProps {
  image: Image;
  openModal: (obj: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div className={css.thumb} style={{ borderColor: image.color }}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.img}
        onClick={() => openModal(image)}
      />
      <p className={css.text}>
        <AiFillLike />
        {image.likes}
      </p>
    </div>
  );
};

export default ImageCard;
