import { useStateValue } from "../../context/stateProvider";

function TopBox() {
  const [{ users }, dispatch] = useStateValue();
  return (
    <div>
      <h2 className="text-2xl mb-4">Top Users</h2>
      <div>
        {users.map((user) => (
          <div
            key={user.uid}
            className="flex items-center justify-between mb-8 "
          >
            <div className="flex gap-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.photoURL}
                alt="picture for user"
              />
              <div className="flex flex-col gap-1">
                <div className=" text-sm font-medium">{user.displayName}</div>
                <div className=" text-[10px]">{user.email}</div>
              </div>
            </div>
            <span className="font-medium">$565</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBox;
