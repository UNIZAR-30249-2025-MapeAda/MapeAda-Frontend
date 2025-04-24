import React from "react";
import { Modal } from "react-bootstrap";
import { Space } from "../types/models";

export interface SpaceDetailsModalProps {
  space: Space;
  show: boolean;
  handleClose: () => void;
  handleBookSpace: () => void;
}

const SpaceDetailsModal: React.FC<SpaceDetailsModalProps> = ({
  space,
  show,
  handleClose,
  handleBookSpace,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-center mx-4" style={{ height: "500px" }}>
        <h1>{space.name}</h1>
        <div className="d-flex">
          <div className="col-3"></div>
          <div className="d-flex flex-column text-start p-4 gap-3 col">
            <div>
              <strong>Categoría: </strong>
              <span>{space.category}</span>
            </div>
            <div>
              <strong>Planta: </strong>
              <span>{space.floor}</span>
            </div>
            <div>
              <strong>Número máximo de ocupantes: </strong>
              <span>{space.capacity}</span>
            </div>
            <div>
              <strong>Horarios: </strong>
              <span>
                {space.startTime} - {space.endTime}
              </span>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center gap-3">
        <button
          className="btn btn-dark px-3"
          type="button"
          onClick={handleBookSpace}
        >
          Añadir a la reserva
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpaceDetailsModal;
