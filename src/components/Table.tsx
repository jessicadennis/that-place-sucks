import {
  ColumnDef,
  ExpandedState,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, ReactElement, Fragment } from "react";

type TableProps<TData> = {
  columns: ColumnDef<unknown>[];
  rows: unknown[];
  renderSubComponent: (props: { row: Row<TData> }) => ReactElement;
  getRowCanExpand: (row: Row<TData>) => boolean;
};

export default function Table({
  columns,
  rows,
  renderSubComponent,
  getRowCanExpand,
}: TableProps<any>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<any>({
    data: rows,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-2">
      <table className="table table-striped table-hover">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      <nav
        aria-label="Table navigation"
        className="d-flex justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <button
              className={
                !table.getCanPreviousPage() ? "page-link disabled" : "page-link"
              }
              type="button"
              aria-label="First"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-backward-fill"
                viewBox="0 0 16 16">
                <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z" />
              </svg>
            </button>
          </li>
          <li className="page-item">
            <button
              className={
                !table.getCanPreviousPage() ? "page-link disabled" : "page-link"
              }
              type="button"
              aria-label="Previous"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <span aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-rewind-fill"
                  viewBox="0 0 16 16">
                  <path d="M8.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L8.404 7.304Z" />
                  <path d="M.404 7.304a.802.802 0 0 0 0 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L.404 7.304Z" />
                </svg>
              </span>
            </button>
          </li>
          {/* TODO: Figure out index buttons or something */}
          <li className="page-item">
            <button
              className={
                !table.getCanNextPage() ? "page-link disabled" : "page-link"
              }
              type="button"
              aria-label="Previous"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <span aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-fast-forward-fill"
                  viewBox="0 0 16 16">
                  <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                  <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                </svg>
              </span>
            </button>
          </li>
          <li className="page-item">
            <button
              className={
                !table.getCanNextPage() ? "page-link disabled" : "page-link"
              }
              type="button"
              aria-label="First"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-forward-fill"
                viewBox="0 0 16 16">
                <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
