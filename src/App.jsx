import { useState, useEffect } from "react";

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

  return (
    <div className="app">
      <h1>My Todo</h1>

      <form>
        <h2>Add Item</h2>
        <input
          type="text"
          placeholder="Title"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
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
          Add
        </button>
      </form>

      <div>
        <h2>My Items</h2>
        <ul>
          {tasks.map((item, index) => {
            return (
              <li
                key={`item-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "200px",
                }}
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
                  <span>{index + 1}</span>
                  <input
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
                <div>
                  <button
                    onClick={() => {
                      const newIsDone = [...isDone];
                      newIsDone[index] = !isDone[index];

                      setItems({ ...items, isDone: newIsDone });
                    }}
                  >
                    d
                  </button>
                  <button
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
