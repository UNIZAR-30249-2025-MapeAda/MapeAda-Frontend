import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText, className = "" }) => {
  const [localText, setLocalText] = useState(searchText);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);
  };

  const handleSearch = () => {
    setSearchText(localText.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`input-group rounded-pill shadow bg-white ${className}`}>
      <input
        type="search"
        className="form-control rounded-pill border-0"
        placeholder="Buscar"
        aria-label="Buscar"
        value={localText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn border-0" type="button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
