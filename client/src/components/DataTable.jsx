import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import DebounceSearch from "./DebounceSearch";

const DataTable = ({ columns, data }) => {
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: data,
    columns,
    state: {
      globalFilter: filter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilter,
  });

  return (
    <div className="flex flex-col items-center justify-self-center gap-4 pt-10 w-full">
      <div className="relative w-full flex lg:justify-end lg:mr-6">
        <DebounceSearch
          value={filter}
          onChange={(value) => setFilter(String(value))}
        />
      </div>
      <table className="border-collapse w-full ">
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="text-white bg-slate-700 py-3"
                >
                  <div
                    className={`${
                      header.column.getCanSort()
                        ? "flex items-center justify-between gap-1 px-4 cursor-pointer select-none"
                        : ""
                    } `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {{ asc: <FaChevronUp />, desc: <FaChevronDown /> }[
                      header.column.getIsSorted()
                    ] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-2 gap-3">
        <span className=" flex items-center gap-1">
          Go to page
          <input
            type="number"
            className="border p-1 rounded bg-transparent w-16"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          name=""
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 15, 20, 30, 50].map((value) => (
            <option key={value} value={value}>
              Show {value}
            </option>
          ))}
        </select>
        <button className="" onClick={() => table.setPageIndex(0)}>
          First Page
        </button>
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span className="flex items-center gap-1">
          <div>page</div>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default DataTable;
