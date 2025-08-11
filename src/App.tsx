import "./App.css";
import Carousel from "./components/Carousel";
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
  const users: User[] = Array.from({ length: 10 }, () => createRandomUser());
  console.log(users);

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center flex-col">
      {/* <Dropdown data={data} /> */}
      {/* <Table_VirtualScrolling users={users} /> */}
      <Carousel users={users} />
    </div>
  );
};

export default App;
