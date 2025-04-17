import { FC, useState, ChangeEvent } from "react";
import { Select } from "./select";
import { UserMenu } from "./userMenu";
import SearchBar from "./search-bar";

interface NavbarProps {
  showBookModal?: boolean;
}

export const Navbar: FC<NavbarProps> = ({ showBookModal: showMultiStep = false }) => {
  const [capacityText, setCapacityText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCapacityText(event.target.value);
  };

  return (
    <nav
      className="col-12 d-flex position-absolute top-0 start-0 p-3"
      style={showMultiStep ? undefined : { zIndex: 10000 }}
    >
      <div className="col-3">
        <SearchBar />
      </div>
      <div className="col row ms-3 gap-2">
        <Select
          options={[
            { value: "categoria", label: "Categoría" },
            { value: "laboratorio", label: "Laboratorio" },
            { value: "despacho", label: "Despacho" },
            { value: "aula", label: "Aula" },
            { value: "seminario", label: "Seminario" },
            { value: "salaComun", label: "Sala común" },
            { value: "salonActos", label: "Salón de actos" },
            { value: "salaReunion", label: "Sala de reunión" },
            { value: "salaInformatica", label: "Sala informática" },
          ]}
          initialValue="categoria"
          onChange={(newValue) => console.log(newValue)}
        />
        <input
          type="text"
          className="form-control rounded-pill border-0 ps-3 w-auto shadow"
          placeholder="Capacidad"
          aria-label="Capacidad"
          value={capacityText}
          onChange={handleInputChange}
          onKeyDown={(newValue) => console.log(newValue)}
        />
      </div>
      <UserMenu className="col-1 text-end" />
    </nav>
  );
};
