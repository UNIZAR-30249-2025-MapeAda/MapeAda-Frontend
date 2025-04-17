import { useState } from "react";
import { Button } from "react-bootstrap";
import BookModal from "../../../features/bookings/components/book-modal";
import { Map } from "../../../components/ui/map";
import { Navbar } from "../../../components/ui/navbar";

function Landing() {
  const [showBookModal, setShowBookModal] = useState(false);

  return (
    <>
      <Navbar showBookModal={showBookModal} />
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
      <Map />
      <BookModal
        show={showBookModal}
        handleClose={() => {
          setShowBookModal(false);
        }}
      />
    </>
  );
}

export default Landing;
