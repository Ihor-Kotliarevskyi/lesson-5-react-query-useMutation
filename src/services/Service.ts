import axios from "axios";

type NewTodo = {
  title: string;
  completed: boolean;
};

export const postTodos = async (newTodo: NewTodo) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    newTodo
  );
  return res.data;
};
