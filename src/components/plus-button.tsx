import plusIcon from "../images/plus.svg";

interface PlusButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const PlusButton = ({ onClick, type = "button" }: PlusButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-20 h-14 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
    >
      <img src={plusIcon} alt="Add" width="24" height="24" />
    </button>
  );
}

export default PlusButton;
