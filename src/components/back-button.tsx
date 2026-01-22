import { twMerge } from "tailwind-merge";
import arrowLeft from "../images/arrow-left.svg";

interface BackButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BackButton = ({ disabled = false, onClick  }: BackButtonProps) => {
  const className = twMerge(
    'w-12 h-14 rounded-lg flex items-center justify-center transition-colors',
    disabled
      ? 'bg-red-300 cursor-not-allowed'
      : 'bg-red-700 hover:bg-red-800 cursor-pointer'
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <img src={arrowLeft} alt="Back" width="28" height="24" />
    </button>
  );
}

export default BackButton;
