import { ComponentProps } from "react";

//interface llamada buttonProps extiende los props del elemento button nativo de react
//Lo que esta dentro de llaves son los props custom, text no existe en el elemento button
interface ButtonProps extends ComponentProps<"button"> {
  text: string;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white"
      type="button"
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
