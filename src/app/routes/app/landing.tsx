import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import BookModal from "../../../features/bookings/components/book-modal";
import { Map } from "../../../components/ui/map";
import { Navbar } from "../../../components/ui/navbar";
import { useGetSpacesByFloor } from "../../../features/bookings/hooks/use-get-spaces-by-floor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function Landing() {
  const [floor, setFloor] = useState(1);
  const [showBookModal, setShowBookModal] = useState(false);
  const { data: spaces, isLoading, error } = useGetSpacesByFloor(floor);

  const [selectedSpaces, setSelectedSpaces] = useState(["L0.01", "A.01"]);

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <Spinner animation="border" /> Cargando espacios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-danger">
        Error al cargar espacios de la planta {floor}.
      </div>
    );
  }

  return (
    <>
      <Navbar showBookModal={showBookModal} />
      <div
        className="position-absolute bottom-0 end-0 d-flex flex-column bg-white shadow m-3 p-2 align-items-center justify-content-center rounded"
        style={showBookModal ? undefined : { zIndex: 10000 }}
      >
        <button
          className="btn bg-transparent border-0"
          onClick={() => setFloor((prev) => Math.min(4, prev + 1))}
          disabled={floor >= 4}
        >
          <FontAwesomeIcon icon={faCaretUp} size="xl" />
        </button>
        <strong className="fs-5">{floor}</strong>
        <button
          className="btn bg-transparent border-0"
          onClick={() => setFloor((prev) => Math.max(0, prev - 1))}
          disabled={floor <= 0}
        >
          <FontAwesomeIcon icon={faCaretDown} size="xl" />
        </button>
      </div>
      <div
        className="position-absolute bottom-50 end-50 p-5"
        style={showBookModal ? undefined : { zIndex: 10000 }}
      >
        <Button
          variant="dark"
          className="rounded-pill p-3 shadow"
          onClick={() => {
            setShowBookModal(true);
          }}
        >
          RESERVAR
        </Button>
      </div>
      <Map spaces={spaces} />
      <BookModal
        spaces={selectedSpaces}
        show={showBookModal}
        handleClose={() => {
          setShowBookModal(false);
        }}
      />
    </>
  );
}

export default Landing;
