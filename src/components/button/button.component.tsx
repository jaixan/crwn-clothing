import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) : typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, onClick, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton onClick={onClick} {...otherProps}>{children}</CustomButton>;
};

export default Button;
