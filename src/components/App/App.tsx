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
import { Image } from "../../types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);

  interface FetchDataInterface {
    total_pages: number;
    results: Image[];
  }

  useEffect(() => {
    if (!query) return;
    const fetchData = async (): Promise<void> => {
      try {
        setError(false);
        setLoading(true);
        const data: FetchDataInterface = await fetchImages(page, query);

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

  const onHandleSubmit = (value: string): void => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
    setIsVisible(false);
    setIsEmpty(false);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (obj: Image): void => {
    setShowModal(true);
    setAlt(obj.alt_description);
    setUrl(obj.urls.regular);
    setDescription(obj.description);
  };

  const closeModal = (): void => {
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
      {isVisible && !loading && <LoadMoreBtn onClick={onLoadMore} />}
      {loading && <Loader />}
      {!images.length && !isEmpty && !loading && (
        <p>Sorry. There are no images...</p>
      )}
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
