import React from "react";
interface Column {
  label: string;
  key: string;
  onClick?: () => void;
  sortable?: boolean;
}
interface TableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function Table<T>({ columns, data, renderRow, className }: TableProps<T>) {
  return (
    <table className={`min-w-full bg-white rounded-lg ${className ?? ''}`}>
      <thead className="bg-green-900 text-white">
        <tr>
          {columns.map((col) => (
            <th key={col.key as string} onClick={col.sortable ? col.onClick : undefined} className="py-3 px-4 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  );
}

export default Table;
