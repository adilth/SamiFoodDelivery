import { useMemo, useState } from "react";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";
import { useDataValue } from "../../context/DataProvider";

function DashboardUsers() {
  const [{ users }] = useDataValue();
  const [data] = useState(useMemo(() => users || [], [users]));
  function getRelativeTime(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const rtf = new Intl.DateTimeFormat("en", options).format(timestamp);
    return rtf;
  }
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
              alt={info.row.original.title}
              className="w-16 h-16 rounded-full p-1"
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
        cell: (info) => <span>{getRelativeTime(info.getValue())}</span>,
      },
    ],
    []
  );
  return <DataTable columns={columns} data={data} />;
}

export default DashboardUsers;
