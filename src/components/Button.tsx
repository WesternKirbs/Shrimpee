interface ButtonProps {
  text: string;
  txtColor: string;
  bgColor: string;
  onClick?: () => void;
}

const Button = ({ text, bgColor, txtColor, onClick }: ButtonProps) => {
  return (
    <button
      className={`p-3 rounded-md ${txtColor} font-semibold ${bgColor}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};

export default Button;
