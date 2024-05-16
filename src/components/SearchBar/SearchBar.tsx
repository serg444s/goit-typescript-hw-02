import css from "./SearchBar.module.css";
import { useState, FormEvent, ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

interface SerchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SerchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter search term!");
      setQuery("");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search images and photos..."
          name="query"
          required
          autoFocus
          value={query}
          className={css.input}
        />
        <button type="submit" className={css.btn} title="To search">
          <IoSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
