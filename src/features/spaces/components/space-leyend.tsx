import React from "react";
import { spaceTypes } from "../types/enums";
import { SPACE_TYPE_COLORS } from "../../../config/constants";

const SpaceLegend: React.FC = () => {
  return (
    <div
        className="position-absolute bottom-0 start-0 d-flex flex-column bg-white shadow m-3 p-2 align-items-start justify-content-center rounded"
        style={{ zIndex: 10000 }}
      >
        <strong className="mb-2">Leyenda de espacios</strong>
      {spaceTypes.map((category, idx) => (
        <div key={category} className="d-flex align-items-center mb-1">
          <span
            className="me-2"
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: SPACE_TYPE_COLORS[idx],
              borderRadius: '2px',
            }}
          />
          <small className="m-0">{category}</small>
        </div>
      ))}
      </div>
  );
};

export default SpaceLegend;
