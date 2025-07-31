import { TableVirtuoso } from "react-virtuoso";
import type { User } from "../utils/faker";
import { useEffect, useState } from "react";

type Props = {
  users: User[];
};

const VirtualizedTable = ({ users }: Props) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState<string>("");

  // console.log(sorting);

  useEffect(() => {
    let temp = [...users];

    if (search.trim() !== "") {
      temp = temp.filter((user) =>
        user.firstName.toLowerCase().includes(search)
      );
    }

    if (sorting === "A-Z") {
      temp = temp.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else {
      temp = temp.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    setFilteredUsers(temp);
  }, [search, sorting, users]);

  const rows = filteredUsers.map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    avatar: user.avatar,
  }));

  return (
    <>
      <input
        type="text"
        placeholder="search users..."
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <select name="" id="" onChange={(e) => setSorting(e.currentTarget.value)}>
        <option value="">Sort</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>

      <TableVirtuoso
        style={{ height: "100vh" }}
        data={rows}
        components={{
          Table: (props) => (
            <table
              {...props}
              className="table-fixed w-full border-collapse border border-gray-300"
            />
          ),
          TableHead: () => (
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border w-[60px]">Avatar</th>
                <th className="p-2 border w-[200px]">Name</th>
                <th className="p-2 border">Email</th>
              </tr>
            </thead>
          ),
          TableRow: (props) => <tr {...props} className="border-b" />,
        }}
        itemContent={(_, user) => (
          <>
            <td className="p-2 border">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </td>
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>
          </>
        )}
      />
    </>
  );
};

export default VirtualizedTable;
