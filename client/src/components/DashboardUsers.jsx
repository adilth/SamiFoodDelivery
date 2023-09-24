import { useMemo, useState } from "react";
import { useStateValue } from "../context/stateProvider";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";

function DashboardUsers() {
  const [{ users }] = useStateValue();
  const [data] = useState(useMemo(() => users, [users]));
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
          <Link to={`/dashboard/users/${info.row.original.uid}`}>
            <img
              src={info.getValue()}
              alt="..."
              className="w-16 h-16 rounded-full"
            />
          </Link>
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
    []
  );
  return <DataTable columns={columns} data={data} />;
}

export default DashboardUsers;
