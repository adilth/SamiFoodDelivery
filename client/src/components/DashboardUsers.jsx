import { useMemo, useState } from "react";
import { useStateValue } from "../context/stateProvider";
import DataTable from "./DataTable";

function DashboardUsers() {
  const [{ users }, dispatch] = useStateValue();
  const [data, setData] = useState(useMemo(() => users, []));
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => <span>{info.row.index + 1}</span>,
      },
      {
        header: "Image",
        accessorKey: "photoURL",
        cell: (info) => (
          // <div className="w-full rounded-full">
          <img
            src={info.getValue()}
            alt="..."
            className="w-16 h-16 rounded-full"
          />
          // </div>
        ),
      },
      {
        header: "Name",
        accessorKey: "displayName",
      },
      {
        header: "email",
        accessorKey: "email",
      },
      {
        header: "Create At",
        accessorKey: "createAt",
      },
    ],
    [data]
  );
  return <DataTable columns={columns} data={data} />;
}

export default DashboardUsers;