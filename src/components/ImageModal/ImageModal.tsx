import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ImageModal = ({ url, alt, description, modalIsOpen, closeModal }) => {
  return (
    <div className={css.container}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={url} alt={alt} className={css.img} />
        <p className={css.text}>{description}</p>
      </Modal>
    </div>
  );
};

export default ImageModal;
