import { Button, ButtonProps } from "antd";

//interface llamada buttonProps extiende los props del elemento button nativo de react
//Lo que esta dentro de llaves son los props custom, text no existe en el elemento button
interface BaseButtonProps extends ButtonProps {
  text: string;
}

const CButton = ({ text, type, onClick }: BaseButtonProps) => {
  return (
    <Button onClick={onClick} type={type}>
      {text}
    </Button>
  );
};

export default CButton;
