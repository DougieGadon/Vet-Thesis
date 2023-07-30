import NavBar from "../../NavBar/NavBar";
import { useEffect, useState } from "react";
import {
  getAllDocumentsFromCollection,
  updateSpecificDocumentInCollection,
} from "../../../firebaseQueries";

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const users = await getAllDocumentsFromCollection("users");
        setAllUsers(users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const banUser = async (e) => {
    e.preventDefault();
    await updateSpecificDocumentInCollection("users", e.target.dataset.userid, {
      banned: true,
    });
    e.target.closest(".user").classList.add("hidden");
  };

  return (
    <div className="min-h-screen bg-bgGreen">
      <NavBar />
      <h2 class="font-heading tracking-px-n mb-10 text-center text-5xl font-bold leading-none text-secGreen md:text-5xl xl:text-5xl">
        User list
      </h2>
      <div className="mx-auto w-full px-4">
        <table className="mx-auto w-full max-w-[1200px] table-auto">
          <thead className="grid grid-cols-5 text-xl font-bold text-blackGreen ">
            <th className="pl-2 text-left">Name</th>
            <th className="pl-1 text-left">Role</th>
            <th className="pl-2 text-left">Email</th>
            <th className="pl-1 text-left">Ban user</th>
            <th className="text-left">Delete User</th>
          </thead>
          {allUsers
            .filter((user) => user.banned === false)
            .map((user) => (
              <tr
                id={`${user.id}`}
                key={`${user.email}${Date.now()}${Math.random()}`}
                className="user mx-auto mt-5 grid grid-cols-5 "
              >
                <td className="text-left">
                  {user.name} {user.surname}
                </td>
                <td className="text-left">
                  {user.role}
                </td>
                <td className="text-left">
                  {user.email}
                </td>
                <td className="text-left">
                  <button
                    onClick={banUser}
                    data-userid={user.id}
                    className="duration rounded-sm p-1 duration-200 hover:bg-emerald-400 hover:text-bgGreen"
                  >
                    Ban User
                  </button>
                </td>
                <td className="text-left">
                  <button className="rounded-sm p-1 text-blackGreen duration-200 hover:bg-red-400 hover:text-bgGreen">
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default UserList;
