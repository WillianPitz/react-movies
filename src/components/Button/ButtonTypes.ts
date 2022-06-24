import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
}> &
  React.HtmlHTMLAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;
