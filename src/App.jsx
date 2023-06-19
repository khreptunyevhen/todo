import { useState, useEffect } from "react";
import { getCurrentDate } from "./common/currentDate";

function App() {
  let [input, setInput] = useState("");
  const [items, setItems] = useState({
    tasks: [],
    isDone: [],
    isDisabled: [],
  });

  useEffect(() => {
    const retriveItems = JSON.parse(localStorage.getItem("items"));
    if (retriveItems) setItems(retriveItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const { tasks, isDone, isDisabled } = items;

  const today = getCurrentDate();

  return (
    <div className="w-96 mx-auto mt-10 bg-white p-10 rounded-3xl drop-shadow-lg">
      <h1 className="font-bold border-b pb-3 mb-4">
        <span className="border-b-4 border-black pb-3">Today's Task</span>
      </h1>

      <form>
        <div className="mb-4">
          <h2 className="font-bold text-2xl">Today's Task</h2>
          <span className="text-primary">{today}</span>
        </div>
        <input
          className="w-full p-4 mb-4 shadow-lg shadow-primary rounded-lg outline-none"
          type="text"
          placeholder="Your task here..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <div className="flex items-center justify-between space-x-2 mb-4">
          <button
            className="w-1/2 text-center text-secondary font-bold bg-blue-100 py-3 rounded-lg duration-200 hover:scale-[1.05]"
            onClick={(event) => {
              event.preventDefault();

              input = input.trim();

              if (!input) {
                return;
              }

              if (tasks.includes(input)) {
                return;
              }

              const newItems = [...tasks];
              newItems.push(input);

              setItems({
                ...items,
                tasks: newItems,
                isDone: [...isDone, false],
                isDisabled: [...isDisabled, false],
              });
              setInput("");
            }}
          >
            + New Task
          </button>
          <button
            className="w-1/2 text-center text-alert font-bold bg-orange-100 py-3 rounded-lg duration-200 hover:scale-[1.05]"
            onClick={(event) => {
              event.preventDefault();

              setItems({
                tasks: [],
                isDone: [],
                isDisabled: [],
              });
            }}
          >
            Reset All
          </button>
        </div>
      </form>

      <div>
        <h2 className="font-bold">My Tasks</h2>
        <span className="inline-block mb-4 italic text-sm text-orange-200">
          *double click to edit
        </span>
        {!tasks.length && <p>Looks like you have no tasks...</p>}
        <ul className="flex flex-col space-y-4">
          {tasks.map((item, index) => {
            return (
              <li
                className="relative p-4 shadow-lg shadow-primary rounded-lg"
                style={{
                  backgroundColor: isDone[index] ? "#EFF1F6" : "white",
                }}
                key={`item-${index}`}
              >
                <p
                  style={{
                    textDecoration: isDone[index] ? "line-through" : "none",
                    display: "flex",
                  }}
                  onDoubleClick={() => {
                    const newIsDisabled = [...isDisabled];
                    newIsDisabled[index] = !isDisabled[index];

                    setItems({ ...items, isDisabled: newIsDisabled });
                  }}
                  onBlur={() => {
                    const newIsDisabled = [...isDisabled];
                    newIsDisabled[index] = !isDisabled[index];

                    setItems({ ...items, isDisabled: newIsDisabled });
                  }}
                >
                  <span
                    className={
                      isDone[index]
                        ? "text-primary inline-block mr-2 decoration-red"
                        : "text-black inline-block mr-2 decoration-red"
                    }
                  >{`${index + 1}.`}</span>
                  <input
                    className={isDone[index] ? "text-primary" : "text-black"}
                    style={{
                      backgroundColor: isDone[index] ? "#EFF1F6" : "white",
                    }}
                    type="text"
                    value={item}
                    disabled={!isDisabled[index]}
                    onChange={(event) => {
                      item = event.target.value;

                      const newItems = [...tasks];
                      newItems[index] = item;
                      setItems({ ...items, tasks: newItems });
                    }}
                  />
                </p>
                <div className="absolute flex space-x-4 right-4 top-[28%]">
                  <button
                    className=" duration-200 hover:scale-[1.05]"
                    onClick={() => {
                      const newIsDone = [...isDone];
                      newIsDone[index] = !isDone[index];

                      setItems({ ...items, isDone: newIsDone });
                    }}
                  >
                    ✔
                  </button>
                  <button
                    className="w-6 h-6 font-bold text-white bg-danger leading-[18px] rounded-full duration-200 hover:scale-[1.05]"
                    onClick={() => {
                      const newItems = [...tasks];
                      const newIsDone = [...isDone];
                      newItems.splice(index, 1);
                      newIsDone.splice(index, 1);

                      setItems({
                        ...items,
                        tasks: newItems,
                        isDone: newIsDone,
                      });
                    }}
                  >
                    x
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
