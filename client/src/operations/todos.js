import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTasks {
      id
      title
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($title: String) {
    addTodo(title: $title) {
      title
      id
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID) {
    updateTodo(id: $id)
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID) {
    deleteTodo(id: $id)
  }
`;
