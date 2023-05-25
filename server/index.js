const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema.js");

let todos = [{ id: "1", title: "goput", completed: false }];

const app = express();
app.use(cors());

const root = {
  getTasks: () => {
    return todos;
  },
  addTodo: ({ title }) => {
    const id = Date.now().toString();
    todos.push({ title, id, completed: false });
    return { title, id, completed: false };
  },
  updateTodo: ({ id }) => {
    const updatedArr = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    todos = updatedArr;
  },
  deleteTodo: ({ id }) => {
    const updatedArr = todos.filter((item) => item.id !== id);
    todos = updatedArr;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(3000, () => console.log("server started"));
