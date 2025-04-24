import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DateStep from "./date-step";
import DurationStep from "./duration-step";
import BookInfoStep from "./book-info-step";
import SummaryStep from "./summary-step";
import { useGetSpaceScheduleAndBookings } from "../hooks/use-get-space-schedule-and-bookings";

interface BookModalProps {
  spaces: string[];
  show: boolean;
  handleClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ spaces, show, handleClose }) => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [fecha, setFecha] = useState<string>("");
  const [duracion, setDuracion] = useState<string>("");
  const [uso, setUso] = useState<string>("");
  const [asistentes, setAsistentes] = useState(0);
  const [detallesAdicionales, setDetallesAdicionales] = useState<string>("");

  const {
    data: schedule,
    isLoading,
    error,
  } = useGetSpaceScheduleAndBookings(spaces);

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return fecha.trim() !== "";
      case 1:
        return duracion.trim() !== "";
      case 2:
        return uso.trim() !== "" && asistentes > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeModal = async () => {
    const result = await Swal.fire({
      title: "¡Atención!",
      text: "Si sale se perderá la información ingresada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Continuar",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-secondary",
      },
    });

    if (result.isConfirmed) {
      resetInfo();
      handleClose();
    }
  };

  const resetInfo = () => {
    setCurrentStep(0);
    setFecha("");
    setDuracion("");
    setUso("");
    setAsistentes(0);
    setDetallesAdicionales("");
    setCurrentStep(0);
  };

  const confirm = () => {
    resetInfo();
    handleClose();
    Swal.fire(
      "¡Completada!",
      "Su reserva se ha realizado con éxito.",
      "success"
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <DateStep
            fecha={fecha}
            setFecha={setFecha}
            defaultSchedule={schedule!.defaultSchedule}
            restrictions={schedule!.restrictions}
          />
        );
      case 1:
        return (
          <DurationStep
            fecha={fecha}
            duracion={duracion}
            setDuracion={setDuracion}
            bookings={schedule!.bookings.filter((b) => b.date === fecha)}
            defaultSchedule={schedule!.defaultSchedule}
            restrictions={schedule!.restrictions}
          />
        );
      case 2:
        return (
          <BookInfoStep
            uso={uso}
            asistentes={asistentes}
            detallesAdicionales={detallesAdicionales}
            setUso={setUso}
            setAsistentes={setAsistentes}
            setDetallesAdicionales={setDetallesAdicionales}
          />
        );
      case 3:
        return (
          <SummaryStep
            espacios={spaces}
            fecha={fecha}
            duracion={duracion}
            uso={uso}
            asistentes={asistentes}
            detallesAdicionales={detallesAdicionales}
            confirm={confirm}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading || !schedule) {
    return (
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body className="text-center p-5">
          <Spinner animation="border" /> Cargando horarios…
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body className="text-center text-danger p-5">
          Error al cargar los horarios.
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      dialogClassName="modal-xl"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-center mx-4" style={{ height: "500px" }}>
        <Stepper
          steps={[
            { label: "Fecha" },
            { label: "Duración" },
            { label: "Datos" },
            { label: "Resumen" },
          ]}
          activeStep={currentStep}
          connectorStateColors
          styleConfig={{
            activeBgColor: "#000000",
            activeTextColor: "#ffffff",
            completedBgColor: "#000000",
            completedTextColor: "#ffffff",
            inactiveBgColor: "#e0e0e0",
            inactiveTextColor: "#ffffff",
            size: "2em",
            circleFontSize: "1em",
            labelFontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "50%",
          }}
          connectorStyleConfig={{
            disabledColor: "#bdbdbd",
            activeColor: "#000000",
            completedColor: "#000000",
            size: 1,
            stepSize: "2em",
            style: "solid",
          }}
          className="mb-4"
        />
        {renderStepContent()}
      </Modal.Body>
      <Modal.Footer className="justify-content-center gap-3">
        {currentStep > 0 && (
          <button
            className="btn btn-outline-dark px-5"
            type="button"
            onClick={previousStep}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
            Anterior
          </button>
        )}
        {isStepValid() ? (
          <button
            className="btn btn-dark px-5"
            type="button"
            onClick={currentStep == totalSteps - 1 ? confirm : nextStep}
          >
            {currentStep == totalSteps - 1 ? (
              "Reservar"
            ) : (
              <>
                Siguiente
                <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
              </>
            )}
          </button>
        ) : (
          <button
            className="btn btn-dark px-5"
            type="button"
            disabled
            onClick={currentStep == totalSteps - 1 ? confirm : nextStep}
          >
            {currentStep == totalSteps - 1 ? (
              "Reservar"
            ) : (
              <>
                Siguiente
                <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
              </>
            )}
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
