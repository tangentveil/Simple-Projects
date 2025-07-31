import "./App.css";
import Dropdown from "./components/Dropdown";
import Table_VirtualScrolling from "./components/Table_VirtualScrolling";
import createRandomUser, { type User } from "./utils/faker";

export type Data = {
  id: string;
  name: string;
};

const data: Data[] = [
  {
    id: "1",
    name: "Home",
  },
  {
    id: "2",
    name: "About",
  },
  {
    id: "3",
    name: "Contact",
  },
];

const App = () => {
  const users: User[] = Array.from({ length: 1000 }, () => createRandomUser());
  console.log(users);

  return (
    <div className="bg-gray-300">
      {/* <Dropdown data={data} /> */}
      <Table_VirtualScrolling users={users} />
    </div>
  );
};

export default App;
