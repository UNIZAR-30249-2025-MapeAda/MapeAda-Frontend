import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import { Select } from "./select";
import { UserMenu } from "./user-menu";
import SearchBar from "./search-bar";
import {
  spaceTypes,
  SpaceType,
} from "../../features/spaces/types/enums";

type NavBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  category?: SpaceType;
  setCategory: (category?: SpaceType) => void;
  minCapacity?: number;
  setMinCapacity: (value?: number) => void;
};

export const Navbar: FC<NavBarProps> = ({
  searchText,
  setSearchText,
  category,
  setCategory,
  minCapacity,
  setMinCapacity,
}) => {
  const [localMinCapacity, setLocalMinCapacity] = useState<string>(
    minCapacity != null ? String(minCapacity) : ""
  );

  const handleCategoryChange = (category: string) => {
    if (category === "categoria") {
      setCategory(undefined);
    } else {
      setCategory(category as SpaceType);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalMinCapacity(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = parseInt(localMinCapacity);
      setMinCapacity(isNaN(value) ? undefined : value);
    }
  };

  return (
    <nav
      className="col-12 d-flex position-absolute top-0 start-0 p-3"
      style={{ zIndex: 10000 }}
    >
      <div className="col-3">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <div className="col row ms-3 gap-2">
        <Select
          options={[
            { value: "categoria", label: "Categoría" },
            ...spaceTypes.map((status) => ({
              value: status,
              label: status,
            })),
          ]}
          initialValue={category ?? "categoria"}
          onChange={(newValue) => handleCategoryChange(newValue)}
        />
        <input
          type="text"
          className="form-control rounded-pill border-0 ps-3 w-auto shadow"
          placeholder="Capacidad máxima"
          aria-label="Capacidad máxima"
          value={localMinCapacity}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <UserMenu className="col-1 text-end" />
    </nav>
  );
};
