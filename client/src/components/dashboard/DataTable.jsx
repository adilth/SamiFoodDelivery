import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaChevronUp } from "@react-icons/all-files/fa/FaChevronUp";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import DebounceSearch from "../DebounceSearch";

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
    <div className="flex flex-col sm:items-center justify-self-center gap-4 pt-10">
      <div className="relative w-full flex lg:justify-end lg:mr-6">
        <DebounceSearch
          val={filter}
          onChange={(value) => setFilter(String(value))}
        />
      </div>
      <div className=" rounded-xl px-2.5 pb-2.5 overflow-auto w-full max-w-full shadow">
        <table className="border-collapse w-full table-auto">
          <thead className=" bg-slate-700 dark:bg-darkCardBody rounded-md">
            {table?.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-white dark:text-slate-300 py-3 px-1"
                  >
                    <div
                      className={`${
                        header.column.getCanSort()
                          ? "flex items-center justify-between gap-1 md:px-2 px-4 cursor-pointer select-none"
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
          <tbody className="[&>*:nth-child(odd)]:bg-white dark:[&>*:nth-child(odd)]:bg-darkCardOverlay ">
            {table?.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row?.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex md:flex-row sm:items-center sm:justify-end justify-start flex-wrap items-start mt-2 gap-3">
        <span className=" flex items-center gap-2">
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
          className="dark:bg-darkPrimary"
          name="item number"
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
        <div className="flex gap-2">
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
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </div>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default DataTable;
