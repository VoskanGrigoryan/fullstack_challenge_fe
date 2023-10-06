import { ComponentProps } from "react";

//interface llamada buttonProps extiende los props del elemento button nativo de react
//Lo que esta dentro de llaves son los props custom, text no existe en el elemento button
interface ButtonProps extends ComponentProps<"button"> {
  text: string;
  className?: string;
}

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 rounded-md p-2 text-white ${className}`}
      type="button"
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
