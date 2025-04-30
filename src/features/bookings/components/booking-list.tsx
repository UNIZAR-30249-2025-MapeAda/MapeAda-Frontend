import React from "react";
import { Button } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BookingListProps {
  spaces: string[];
  show: boolean;
  onRemove: (index: number) => void;
  onBook: () => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  spaces,
  show,
  onRemove,
  onBook,
}) => {
  if (!show) return null;

  return (
    <div
      className="position-absolute bottom-0 my-3 p-3 bg-white rounded shadow"
      style={{ zIndex: 10000, right: 100 }}
    >
      {spaces.map((space, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <span>{space}</span>
          <button
            className="btn bg-transparent"
            onClick={() => onRemove(idx)}
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
          </button>
        </div>
      ))}

      <Button variant="dark" className="rounded-pill px-3 shadow w-100" onClick={onBook}>
        Reservar
      </Button>
    </div>
  );
};
