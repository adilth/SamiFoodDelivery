import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useStateValue } from "../context/stateProvider";
import { useMemo, useState } from "react";
import DataTable from "./DataTable";
import { useAlertState } from "../context/alertProvider";
import { alertActionTypes } from "../context/alertReducer";
import ModalUpdateItem from "./ModalUpdateItem";
import { deleteItem } from "../utils/firebaseFunc";
function DashboardItems() {
  const [{ foodItems }, dispatch] = useStateValue();
  const { setAlert } = useAlertState();
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(useMemo(() => foodItems, []));
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Image",
        accessorKey: "imgURL",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="..."
            className="w-32 h-16 object-contain rounded-md"
          />
        ),
      },
      {
        header: "Name",
        accessorKey: "title",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (info) => (
          <p className=" text-lg font-semibold text-textColor flex items-center justify-center gap-1">
            <span className=" text-green-600">$</span>
            {info.getValue()}
          </p>
        ),
      },
      {
        header: "Edit",
        accessorKey: "edit",
        cell: (info) => (
          <div
            onClick={() => {
              setEditItem(info.row.original);
              setOpen(true);
            }}
          >
            <FaEdit className="w-5  object-contain rounded-md cursor-pointer" />
          </div>
        ),
      },
      {
        header: "Delete",
        id: "delete",
        accessor: (str) => "delete",
        cell: (info) => (
          <RiDeleteBin6Fill
            onClick={async () => {
              try {
                deleteItem(info.row.original.id);
                const dataCopy = [...data];
                // It should not matter what you name tableProps. It made the most sense to me.
                dataCopy.splice(info.row.index, 1);
                setData(dataCopy);
                setAlert(
                  alertActionTypes.SET_SUCCESS,
                  "the product was successfully deleted"
                );
                setInterval(() => {
                  setAlert(alertActionTypes.SET_ALERT_NULL, "");
                }, 3000);
              } catch (error) {
                console.error("Error deleting item:", error);
                setAlert(
                  alertActionTypes.SET_DANGER,
                  "Failed to delete item: " + error
                );
                setInterval(() => {
                  setAlert(alertActionTypes.SET_ALERT_NULL, "");
                }, 3000);
              }
            }}
            className="w-5  object-contain rounded-md cursor-pointer"
          />
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <DataTable columns={columns} data={data} />;
      {open && (
        <ModalUpdateItem
          slug="product"
          setOpen={() => setOpen(false)}
          item={editItem}
        />
      )}
    </>
  );
}

export default DashboardItems;
