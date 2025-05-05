import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Intervalo, Propietarios, Space } from "../types/models";
import { spaceCategories } from "../types/enums";
import { Select } from "../../../components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useGetBuilding } from "../../building/api/get-buiding";
import { ErrorMessage } from "../../../components/errors/error-message";
import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import Swal from "sweetalert2";

interface EditSpaceFormProps {
  space: Space;
  onSubmit: (payload: {
    reservable?: boolean;
    categoria?: string;
    propietarios?: Propietarios[];
    horario?: Intervalo | null;
  }) => Promise<void>;
  onDirty?: () => void;
}
const EditSpaceForm: React.FC<EditSpaceFormProps> = ({
  space,
  onSubmit,
  onDirty,
}) => {
  const shouldFetchSchedule = space.horario?.inicio == null;
  const {
    data: building,
    isLoading,
    error,
  } = useGetBuilding({
    queryKey: ["shouldFetchSchedule"],
    enabled: shouldFetchSchedule,
  });
  const [reservable, setReservable] = useState<boolean>(space.reservable);
  const [categoria, setCategoria] = useState<string>(String(space.categoria));
  const [propietarios, setPropietarios] = useState<Propietarios[]>(
    space.propietarios
  );
  const defaultHorario: Intervalo =
    space.horario?.inicio != null && space.horario?.fin != null
      ? {
          inicio: space.horario.inicio,
          fin: space.horario.fin,
        }
      : building?.calendarioApertura.intervaloPorDefecto ?? {
          inicio: "",
          fin: "",
        };
  const [horario, setHorario] = useState<Intervalo>({ ...defaultHorario });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const spaceOwnersStyles: Record<
    number,
    { text: string; bg: string; border: string }
  > = {
    0: {
      text: "text-danger",
      bg: "bg-danger bg-opacity-10",
      border: "border-danger border-opacity-10",
    },
    1: {
      text: "text-success",
      bg: "bg-success bg-opacity-10",
      border: "border-success border-opacity-10",
    },
    2: {
      text: "text-primary",
      bg: "bg-primary bg-opacity-10",
      border: "border-primary border-opacity-10",
    },
  };

  const initial = useRef({
    reservable: space.reservable,
    categoria: String(space.categoria),
    propietarios: JSON.stringify(space.propietarios),
    horario: JSON.stringify(defaultHorario),
  });

  const hasChanges = useMemo(() => {
    return (
      initial.current.reservable !== reservable ||
      initial.current.categoria !== categoria ||
      initial.current.propietarios !== JSON.stringify(propietarios) ||
      initial.current.horario !== JSON.stringify(defaultHorario)
    );
  }, [reservable, categoria, propietarios, horario, initial.current]);

  useEffect(() => {
    if (
      shouldFetchSchedule &&
      building?.calendarioApertura?.intervaloPorDefecto
    ) {
      setHorario(building.calendarioApertura.intervaloPorDefecto);
    }
  }, [shouldFetchSchedule, building]);

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setReservable(e.target.checked);
    onDirty?.();
  };

  const handleCategoria = (newVal: string) => {
    setCategoria(newVal);
    onDirty?.();
  };

  const removeOwner = (id: string) => {
    setPropietarios((owners) => owners.filter((o) => o.id !== id));
    onDirty?.();
  };

  const addOwner = async () => {
    const soloUsuario = propietarios.length === 1 && propietarios[0].tipo === 2;

    const { value: formValues } = await Swal.fire({
      title: "Nuevo propietario",
      html: soloUsuario
        ? '<input id="ownerId" class="swal2-input" placeholder="ID" />'
        : '<select id="ownerType" class="swal2-select" style="width:auto;max-width:100%;padding:0.5rem;margin-bottom:1rem;">' +
          '<option value="EINA">EINA</option>' +
          '<option value="Departamento">Departamento</option>' +
          '<option value="Usuario">Usuario</option>' +
          "</select>" +
          '<input id="ownerId" class="swal2-input" placeholder="ID" style="display:none;" />',
      didOpen: () => {
        if (!soloUsuario) {
          const typeEl =
            Swal.getPopup()!.querySelector<HTMLSelectElement>("#ownerType")!;
          const idEl =
            Swal.getPopup()!.querySelector<HTMLInputElement>("#ownerId")!;
          typeEl.addEventListener("change", () => {
            if (typeEl.value === "Departamento" || typeEl.value === "Usuario") {
              idEl.style.display = "block";
            } else {
              idEl.style.display = "none";
            }
          });
        }
      },
      preConfirm: () => {
        if (soloUsuario) {
          const idEl =
            Swal.getPopup()!.querySelector<HTMLInputElement>("#ownerId")!;
          if (!idEl.value) {
            Swal.showValidationMessage("Debes introducir el ID");
            return;
          }
          return { tipo: "Usuario", id: idEl.value };
        } else {
          const typeEl =
            Swal.getPopup()!.querySelector<HTMLSelectElement>("#ownerType")!;
          const idEl =
            Swal.getPopup()!.querySelector<HTMLInputElement>("#ownerId")!;
          const tipoVal = typeEl.value as "EINA" | "Departamento" | "Usuario";
          const idVal = idEl.value;
          if ((tipoVal === "Departamento" || tipoVal === "Usuario") && !idVal) {
            Swal.showValidationMessage("Debes introducir el ID");
            return;
          }
          return { tipo: tipoVal, id: idVal || tipoVal };
        }
      },
      showCancelButton: true,
    });

    if (formValues) {
      const tipoCode =
        formValues.tipo === "EINA"
          ? 0
          : formValues.tipo === "Departamento"
          ? 1
          : 2;
      setPropietarios((owners) => [
        ...owners,
        { tipo: tipoCode, id: formValues.id },
      ]);
      onDirty?.();
    }
  };

  const handleHorarioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHorario((h) => ({ ...h, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: {
        reservable?: boolean;
        categoria?: string;
        propietarios?: Propietarios[];
        horario?: Intervalo | null;
      } = {};

      if (initial.current.reservable !== reservable) {
        payload.reservable = reservable;
      }
      if (initial.current.categoria !== categoria) {
        payload.categoria = categoria;
      }
      if (initial.current.propietarios !== JSON.stringify(propietarios)) {
        payload.propietarios = propietarios;
      }
      const payloadHorario: Intervalo | null =
        horario.inicio === defaultHorario.inicio &&
        horario.fin === defaultHorario.fin
          ? null
          : horario;
      if (payloadHorario !== null) {
        payload.horario = payloadHorario;
      }
      if (Object.keys(payload).length > 0) {
        await onSubmit(payload);
        initial.current = {
          reservable,
          categoria,
          propietarios: JSON.stringify(propietarios),
          horario: JSON.stringify(horario),
        };
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (shouldFetchSchedule && isLoading) {
    return <LoadingIndicator message="Cargando información del espacio..." />;
  }

  if (shouldFetchSchedule && error) {
    return (
      <ErrorMessage message="Error al obtener la información del espacio." />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <strong>ID: </strong>
        <span>{space!.id}</span>
      </div>
      <div className="mb-3">
        <strong>Nombre: </strong>
        <span>{space!.nombre}</span>
      </div>
      <div className="mb-3">
        <strong>Tamaño: </strong>
        <span>{String(space!.tamanyo)}</span>
      </div>
      <div className="mb-3">
        <strong>Reservable: </strong>
        <span>{space!.reservable ? "Sí" : "No"}</span>
      </div>
      <div className="mb-3">
        <strong>Tipo: </strong>
        <span>{spaceCategories[Number(space!.tipo)]}</span>
      </div>
      <div className="mb-3">
        <strong>Planta: </strong>
        <span>{space!.planta}</span>
      </div>
      <div className="mb-3">
        <strong>Capacidad: </strong>
        <span>{space!.capacidad}</span>
      </div>
      <div className="mb-3 gap-3 d-flex align-items-center">
        <strong>Reservable: </strong>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="reservable"
            checked={reservable}
            onChange={handleSwitch}
          />
          <label className="form-check-label" htmlFor="reservable">
            Sí
          </label>
        </div>
      </div>
      <div className="mb-4 gap-3 d-flex align-items-center">
        <strong>Categoría: </strong>
        <Select
          options={[
            { value: "", label: "-- Selecciona categoría --" },
            ...spaceCategories.map((label, idx) => ({
              value: String(idx),
              label,
            })),
          ]}
          initialValue={categoria}
          onChange={handleCategoria}
        />
      </div>
      <div className="mb-3 gap-3 d-flex">
        <strong>Propietarios: </strong>
        <div>
          {propietarios.map((owner) => (
            <span
              key={owner.id}
              className={`
                badge bg-secondary me-2 d-inline-flex align-items-center fw-semibold
                ${spaceOwnersStyles[Number(owner.tipo)].text}
                ${spaceOwnersStyles[Number(owner.tipo)].bg}
                ${spaceOwnersStyles[Number(owner.tipo)].border}
              `}
            >
              {owner.id}
              <button
                type="button"
                className="btn-close btn-sm ms-2"
                aria-label="Eliminar"
                onClick={() => removeOwner(owner.id)}
              />
            </span>
          ))}
          {(propietarios.length === 0 ||
            (propietarios.length > 0 &&
              propietarios.length < 2 &&
              propietarios[0].tipo === 2)) && (
            <button
              type="button"
              className="btn btn-outline-warning btn-sm"
              onClick={addOwner}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-4 gap-2 d-flex align-items-center">
        <strong>Horario: </strong>
        <div>
          <input
            type="time"
            className="form-control"
            name="inicio"
            value={horario.inicio}
            onChange={handleHorarioChange}
          />
        </div>
        <span>a</span>
        <div>
          <input
            type="time"
            className="form-control"
            name="fin"
            value={horario.fin}
            onChange={handleHorarioChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-warning px-4 col-12"
        disabled={!hasChanges || isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
};

export default EditSpaceForm;
