import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const CustomButton: FC<ButtonProps> = ({ children, className, type = "button", onClick, ...props }) => {
  return (
    <Button
      className={cn(styles.button, className)}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
};

export { CustomButton };
