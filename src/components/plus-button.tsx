import plusIcon from "../images/plus.svg";

interface PlusButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PlusButton = ({ onClick }: PlusButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-20 h-14 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
    >
      <img src={plusIcon} alt="Add" width="24" height="24" />
    </button>
  );
}

export default PlusButton;
