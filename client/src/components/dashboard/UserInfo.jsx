import { useMemo } from "react";
import Single from "./Single";
import { userData } from "../../utils/singletData";
import { useParams } from "react-router-dom";
import { useDataValue } from "../../context/DataProvider";

function UserInfo() {
  const [{ users, orders, activity }] = useDataValue();
  const { userId } = useParams();
  let filter = users.filter((user) => user.uid == userId);
  const singleUser = useMemo(
    () => userData(filter[0], activity, orders),
    [filter, activity, orders]
  );

  return (
    <div>
      <Single {...singleUser} />
    </div>
  );
}

export default UserInfo;
