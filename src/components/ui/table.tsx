import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyField,
  className = "",
}: TableProps<T>) {
  return (
    <table className={`table table-striped ${className}`}>
      <thead className="table-dark">
        <tr className="align-middle">
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={String(row[keyField])} className="align-middle">
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render
                  ? col.render(row, rowIndex)
                  : String(
                      typeof col.accessor === "string"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ? (row as any)[col.accessor]
                        : row[col.accessor]
                    )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
