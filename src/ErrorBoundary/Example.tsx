import { useState } from "react";

interface DataType {
  id: number;
  name: string;
}
const Example = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const handleClick = () => {
    console.log("Clicked");
    let dataFromApi = null;
    // let dataFromApi = [
    //   { id: 1, name: "Item 1" },
    //   { id: 2, name: "Item 2" },
    //   { id: 3, name: "Item 3" },
    // ];
    setData(dataFromApi);
    // @ts-ignore
    // console.log("Data loaded:-", dataFromApi[0]?.name, data);
  };

  return (
    <div>
      <h1>Error Boundary Example</h1>
      <button onClick={handleClick}>Load Data</button>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Example;
