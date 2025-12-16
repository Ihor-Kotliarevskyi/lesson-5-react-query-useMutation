interface TodoBarProps {
  value: string;
  onCreate: (newValue: string) => void;
}

function TodoBar({ value, onCreate }: TodoBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onCreate(event.target.value);

  return (
    <>
      <input value={value} onChange={handleChange} />
    </>
  );
}

export default TodoBar;
