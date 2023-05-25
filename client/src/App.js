import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  GET_TASKS,
  UPDATE_TODO,
  ADD_TODO,
  DELETE_TODO,
} from "./operations/todos";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);

  const [todos, setTodos] = useState();
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (!loading) {
      setTodos(data.getTasks);
    }
  }, [data, loading]);

  const [newTodo] = useMutation(ADD_TODO);
  const [deletedTodo] = useMutation(DELETE_TODO);
  const [updatedTodo] = useMutation(UPDATE_TODO);

  const addTodo = (e) => {
    e.preventDefault();
    newTodo({
      variables: {
        title: userInput,
      },
    }).then(({ data }) => {
      setUserInput("");
      console.log("data", data);
      setTodos((prev) => [...prev, data.addTodo]);
    });
  };

  const deleteTodo = (id) => {
    deletedTodo({
      variables: {
        id,
      },
    }).then((data) =>
      setTodos((prev) => prev.filter((item) => item.id !== id))
    );
  };

  const completeTodo = (id) => {
    updatedTodo({
      variables: {
        id,
      },
    }).then((data) =>
      setTodos((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, completed: !item.completed };
          } else {
            return item;
          }
        })
      )
    );
  };

  return (
    <>
      <form onSubmit={addTodo}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="add todo here"
        />
        <button>Submit</button>
      </form>
      <ul>
        {todos &&
          todos.map((item) => (
            <div key={item.id} style={{ display: "flex" }}>
              <li onClick={() => completeTodo(item.id)}>{item.title}</li>
              <button onClick={() => deleteTodo(item.id)}> Delete</button>
              {item.completed && <span>done</span>}
            </div>
          ))}
      </ul>
    </>
  );
}

export default App;
