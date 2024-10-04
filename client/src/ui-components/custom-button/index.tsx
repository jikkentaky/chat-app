import { Button, ButtonBaseProps } from "@mui/material"
import { FC } from "react"
import cn from "classnames"
import styles from "./styles.module.scss"

const CustomButton: FC<ButtonBaseProps> = ({ children, className, type, onClick }) => {
  return (
    <Button
      className={cn(styles.button, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  )
}

export { CustomButton }
