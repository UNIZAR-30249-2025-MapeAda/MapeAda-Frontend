import { LoadingIndicator } from "../../../components/ui/loading-indicator";
import { ErrorMessage } from "../../../components/errors/error-message";
import { useParams, useNavigate } from "react-router";
import { useGetSpaceById } from "../../../features/spaces/api/get-space-by-id";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paths } from "../../../config/paths";
import EditSpaceForm from "../../../features/spaces/components/edit-space-form";
import Swal from "sweetalert2";
import { Intervalo, Propietarios } from "../../../features/spaces/types/models";
import { useState, useCallback } from "react";
import { usePatchSpace } from "../../../features/spaces/api/patch-space";
import { showApiError } from "../../../utils/error";

type RouteParams = {
  spaceId: string;
};

const EditSpace = () => {
  const { spaceId } = useParams<RouteParams>();
  const { data: space, isLoading, error } = useGetSpaceById(spaceId!);
  const patchSpaceMutation = usePatchSpace();
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const navigate = useNavigate();

  const handleDirty = useCallback(() => {
    setHasUnsaved(true);
  }, []);

  const handleBackClick = (e: React.MouseEvent) => {
    if (!hasUnsaved) {
      navigate(paths.app.dashboard.getHref());
      return;
    }
    e.preventDefault();
    Swal.fire({
      title: "Tienes cambios sin guardar",
      text: "Si sales ahora, se perderán los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Permanecer",
    }).then((res) => {
      if (res.isConfirmed) {
        navigate(paths.app.dashboard.getHref());
      }
    });
  };

  const handleSaveChanges = async (changes: {
    reservable?: boolean;
    categoria?: string;
    propietarios?: Propietarios[];
    horario?: Intervalo | null;
  }) => {
    try {
      await patchSpaceMutation.mutateAsync({
        id: space!.id,
        data: Object.entries(changes).map(([key, value]) => ({
          op: "replace",
          path: `/${key}`,
          value,
        })),
      });
      Swal.fire("¡Guardado!", "Espacio actualizado correctamente", "success");
      setHasUnsaved(false);
    } catch (err) {
      showApiError(err);
    }
    navigate(paths.app.dashboard.getHref());
  };

  if (isLoading) {
    return <LoadingIndicator message="Cargando información del espacio..." />;
  }

  if (error) {
    return (
      <ErrorMessage message="Error al obtener la información del espacio." />
    );
  }

  return (
    <div className="d-flex mt-5">
      <div className="col-4" />
      <div className="col">
        <div className="d-flex align-items-center gap-5 mb-4">
          <button className="btn" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <h1>Editar espacio</h1>
        </div>
        <EditSpaceForm
          space={space!}
          onSubmit={handleSaveChanges}
          onDirty={handleDirty}
        />
      </div>
      <div className="col-4" />
    </div>
  );
};

export default EditSpace;
