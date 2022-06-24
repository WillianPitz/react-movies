import { ButtonProps } from "./ButtonTypes";

const Button = ({ children, className, ...rest }: ButtonProps): JSX.Element => {
  return (
    <button
      className={` ${className} w-full h-10 self-end rounded-sm text-[#FFFFFF] font-medium text-lg bg-[#6558F5] border-solid border-2 border-[#6558F5] hover:opacity-90 transition-opacity`}
      data-testid="button-test"
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
