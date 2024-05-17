import css from "./LoadMoreBtn.module.css";

interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreBtn: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      Load More
    </button>
  );
};
