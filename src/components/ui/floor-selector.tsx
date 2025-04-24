import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface FloorSelectorProps {
  floor: number;
  setFloor: (newFloor: number) => void;
  maxFloor?: number;
  minFloor?: number;
  disabled?: boolean;
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({
  floor,
  setFloor,
  maxFloor = 4,
  minFloor = 0,
  disabled = false,
}) => (
  <div
    className="position-absolute bottom-0 end-0 d-flex flex-column bg-white shadow m-3 p-2 align-items-center justify-content-center rounded"
    style={{ zIndex: 10000 }}
  >
    <button
      className="btn bg-transparent border-0"
      onClick={() => setFloor(Math.min(maxFloor, floor + 1))}
      disabled={floor >= maxFloor || disabled}
    >
      <FontAwesomeIcon icon={faCaretUp} size="xl" />
    </button>
    <strong className="fs-5">{floor}</strong>
    <button
      className="btn bg-transparent border-0"
      onClick={() => setFloor(Math.max(minFloor, floor - 1))}
      disabled={floor <= minFloor || disabled}
    >
      <FontAwesomeIcon icon={faCaretDown} size="xl" />
    </button>
  </div>
);
