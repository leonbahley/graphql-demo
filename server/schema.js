const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Todo {
        id: ID
        title: String
        completed: Boolean
    }

    type Query {
        getTasks: [Todo]
    }

    type Mutation {
        addTodo(title: String):Todo
        updateTodo(id: ID):ID
        deleteTodo(id: ID):ID
    }
`);

module.exports = schema;
