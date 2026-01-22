import { twMerge } from "tailwind-merge";
import arrowRight from "../images/arrow-right.svg";

interface ForwardButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ForwardButton = ({ disabled = false, onClick }: ForwardButtonProps) => {
  const className = twMerge(
    'w-12 h-14 rounded-lg flex items-center justify-center transition-colors',
    disabled
      ? 'bg-green-300 cursor-not-allowed'
      : 'bg-green-700 hover:bg-green-800 cursor-pointer'
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <img src={arrowRight} alt="Forward" width="28" height="24" />
    </button>
  );
}

export default ForwardButton;
