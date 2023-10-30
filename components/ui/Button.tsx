// import { Button, ButtonProps } from "antd";
import { Button, ButtonProps } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

//Mix del button props de mantine con el button props de html
type CustomButtonProps = ButtonProps & ComponentPropsWithoutRef<"button"> & {};

const CustomButton = ({
  children,
  size = "xs",
  variant = "filled",
  color = "blue",
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      {...props}
      radius="sm"
      variant={variant}
      color={color}
      size={size}
      fullWidth
    >
      {children}
    </Button>
  );
};

export default CustomButton;
