import type { CompletedOptionType } from "../../types/types";

interface CompletedOptionProps {
  value: boolean;
  onSelect: (option: boolean) => void;
}

function CompletedOption({ value, onSelect }: CompletedOptionProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const optionValue = event.target.value as CompletedOptionType;
    if (optionValue === "true") {
      onSelect(true);
    } else {
      onSelect(false);
    }
  };

  return (
    <>
      <select value={value.toString()} onChange={handleChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </>
  );
}

export default CompletedOption;
