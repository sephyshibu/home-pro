export interface Column<T> {
  header: string;
  renderCell: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: string;
}