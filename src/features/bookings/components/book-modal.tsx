import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DateStep from "./date-step";
import DurationStep from "./duration-step";
import BookInfoStep from "./book-info-step";
import SummaryStep from "./summary-step";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { getBookingsBySpaceQuery } from "../api/get-bookings-by-space";
import { useQueries } from "@tanstack/react-query";
import { Booking } from "../types/models";
import { useGetBuilding } from "../../building/api/get-buiding";
import { Space } from "../../spaces/types/models";
import { addHours, formatISO, parse, parseISO } from "date-fns";
import { usePostBooking } from "../api/post-booking";
import { PostBookingRequest } from "../../../types/api";
import { useUser } from "../../../lib/auth";
import { bookingUsages } from "../types/enums";
import emitter from "../../../utils/emitter";
import { showApiError } from "../../../utils/error";

interface BookModalProps {
  spaces: Space[];
  show: boolean;
  handleClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ spaces, show, handleClose }) => {
  const user = useUser();
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [fecha, setFecha] = useState<string>("");
  const [duracion, setDuracion] = useState<string>("");
  const [uso, setUso] = useState<string>("");
  const [asistentes, setAsistentes] = useState(0);
  const [detallesAdicionales, setDetallesAdicionales] = useState<string>("");
  const spacesNames = useMemo(() => spaces.map((s) => s.nombre), [spaces]);

  const {
    data: building,
    isLoading: loadingBuilding,
    error: errorBuilding,
  } = useGetBuilding();

  const bookingQueries = useQueries({
    queries: spaces.map((s) => getBookingsBySpaceQuery(s.id)),
  });

  const postBookingMutation = usePostBooking();

  const loadingBookings = bookingQueries.some((q) => q.isLoading);
  const errorBookings = bookingQueries.find((q) => q.error)?.error;

  const bookings: Booking[] = bookingQueries
    .filter((q) => q.data)
    .map((q) => q.data as Booking[])
    .flat();

  const isLoading = loadingBuilding || loadingBookings;
  const error = errorBuilding || errorBookings;

  const capacidadTotal = useMemo(() => {
    return spaces.reduce((total, s) => total + s.capacidad, 0);
  }, [spaces]);

  const maxAsistentes = useMemo(() => {
    if (!building) return 0;
    return Math.floor(
      (capacidadTotal * building.porcentajeUsoMaximo.valor) / 100
    );
  }, [capacidadTotal, building]);

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

  const confirm = async () => {
    const [day, month, year] = fecha.split("/");
    const dateIso = `${year}-${month}-${day}`;

    const slots = duracion.split(",");
    const inicioSlot = slots[0];
    const ultimoSlot = slots[slots.length - 1];

    const inicioIso = `${dateIso}T${inicioSlot}:00`;
    const ultimoIso = `${dateIso}T${ultimoSlot}:00`;

    const finDate = addHours(parseISO(ultimoIso), 1);
    const finIso = formatISO(finDate, { representation: "complete" });

    const request: PostBookingRequest = {
      nip: user.data!.nip,
      espacios: spaces.map((s) => String(s.id)),
      uso: bookingUsages.indexOf(uso),
      asistentes,
      periodo: {
        inicio: inicioIso,
        fin: finIso,
      },
      observaciones: detallesAdicionales || undefined,
    };

    try {
      await postBookingMutation.mutateAsync({
        data: request,
      });
      Swal.fire(
        "¡Completada!",
        "Su reserva se ha realizado con éxito.",
        "success"
      );
      resetInfo();
      handleClose();
      emitter.emit('bookingCreated')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showApiError(err);
    }
  };

  const renderStepContent = () => {
    const target = parse(fecha, 'dd/MM/yyyy', new Date())

    switch (currentStep) {
      case 0:
        return (
          <DateStep fecha={fecha} setFecha={setFecha} building={building!} />
        );
      case 1:
        return (
          <DurationStep
            fecha={fecha}
            duracion={duracion}
            setDuracion={setDuracion}
            spaces={spaces}
            bookings={bookings.filter(reserva => {
              const inicio = new Date(reserva.periodo.inicio);
              return inicio.getFullYear() === target.getFullYear()
                  && inicio.getMonth()    === target.getMonth()
                  && inicio.getDate()     === target.getDate();
            })}
            building={building!}
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
            maxAsistentes={maxAsistentes}
          />
        );
      case 3:
        return (
          <SummaryStep
            espacios={spacesNames}
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

  if (isLoading) {
    return (
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body className="text-center p-5">
          <LoadingIndicator message="Cargando reservas..." />
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body className="text-center text-danger p-5">
          <ErrorMessage message="Error al cargar los horarios." />
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
