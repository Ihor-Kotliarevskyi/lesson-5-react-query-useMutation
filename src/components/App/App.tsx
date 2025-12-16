import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodos } from "../../services/Service";
import { useState } from "react";
import TodoBar from "../TodosBar/TodosBar";
import CompletedOption from "../CompletedOption/CompletedOption";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const queryClient = useQueryClient();

  const [titleText, setTitleText] = useState("");
  const [isCompleted, setIsCompleted] = useState(true);

  const mutation = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("Todo added successfully");
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({
      title: titleText,
      completed: isCompleted,
    });
  };

  return (
    <>
      <TodoBar
        value={titleText}
        onCreate={useDebouncedCallback(
          (newValue) => setTitleText(newValue),
          100
        )}
      />
      <CompletedOption value={isCompleted} onSelect={setIsCompleted} />
      <br></br>
      <p>
        Нове завдання:
        <br></br>
        Опис: <strong>{titleText}</strong>
        <br></br>
        Завершено? <strong>{isCompleted ? `Так` : `Ні`}</strong>
      </p>
      <br></br>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}

export default App;
