import "./App.css";
import Dropdown from "./components/Dropdown";

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
  return (
    <div className="bg-gray-300">
      <Dropdown data={data} />
    </div>
  );
};

export default App;
