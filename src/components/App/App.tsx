import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../photo-api";
import "./App.css";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

interface Image {
  id: string;
  color: string;
  alt_description: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImages(page, query);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsVisible(page < data.total_pages);
      } catch (error) {
        setError(error);
        toast.error("Whoops, something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
    setIsVisible(false);
    setIsEmpty(false);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (obj) => {
    setShowModal(true);
    setAlt(obj.alt_description);
    setUrl(obj.urls.regular);
    setDescription(obj.description);
  };

  const closeModal = () => {
    setShowModal(false);
    setAlt("");
    setUrl("");
    setDescription("");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearch={onHandleSubmit} />
      {error && <ErrorMessage />}
      {!images.length && isEmpty && <p>Let`s begin search...</p>}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isVisible && !loading && (
        <LoadMoreBtn onClick={onLoadMore} loading={loading} />
      )}
      {loading && <Loader />}
      {!images.length && !isEmpty && <p>Sorry. There are no images...</p>}
      <ImageModal
        url={url}
        alt={alt}
        description={description}
        modalIsOpen={showModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
