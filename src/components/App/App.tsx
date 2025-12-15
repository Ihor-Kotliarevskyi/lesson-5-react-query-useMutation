import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodos } from "../../services/Service";

function App() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("Todo added successfully");
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({
      title: "My new todo",
      completed: false,
    });
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}

export default App;
