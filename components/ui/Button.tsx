import { Button, ButtonProps } from "antd";

//interface llamada buttonProps extiende los props del elemento button nativo de react
//Lo que esta dentro de llaves son- los props custom, text no existe en el elemento button
interface BaseButtonProps extends ButtonProps {}

//Cosas a agregar
const CButton = ({ children, type = "primary", ...props }: BaseButtonProps) => {
  return (
    <Button type={type} {...props}>
      {children}
    </Button>
  );
};

export default CButton;
