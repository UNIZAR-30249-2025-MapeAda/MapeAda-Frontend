import { FC, useState, ChangeEvent } from "react";
import { Select } from "./select";
import { UserMenu } from "./user-menu";
import SearchBar from "./search-bar";
import {
  spaceCategories,
  SpaceCategory,
} from "../../features/spaces/types/enums";

type NavBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  category?: SpaceCategory;
  setCategory: (category?: SpaceCategory) => void;
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
  const handleCategoryChange = (newCategory: SpaceCategory) => {
    setCategory(newCategory);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinCapacity(Number(event.target.value));
  };

  return (
    <nav
      className="col-12 d-flex position-absolute top-0 start-0 p-3"
      style={{ zIndex: 10000 }}
    >
      <div className="col-3">
        <SearchBar />
      </div>
      <div className="col row ms-3 gap-2">
        <Select
          options={[
            { value: "categoria", label: "Categoría" },
            ...spaceCategories.map((status) => ({
              value: status,
              label: status,
            })),
          ]}
          initialValue="categoria"
          onChange={(newValue) =>
            handleCategoryChange(newValue as SpaceCategory)
          }
        />
        <input
          type="text"
          className="form-control rounded-pill border-0 ps-3 w-auto shadow"
          placeholder="Capacidad máxima"
          aria-label="Capacidad máxima"
          value={minCapacity}
          onChange={handleInputChange}
          onKeyDown={(newValue) => console.log(newValue)}
        />
      </div>
      <UserMenu className="col-1 text-end" />
    </nav>
  );
};
