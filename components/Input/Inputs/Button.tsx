import type { InputPropsEx } from "../Input";

import { useTheme } from "@/lib/ThemeProvider";

import Label from "./Label";

const Button = ({
  children,
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & InputPropsEx) => {
  const { realTheme } = useTheme();

  return (
    <Label className="p-0! mt-0! border-0!" label={label}>
      <button
        {...props}
        className={`
        ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
        cursor-pointer
        font-semibold py-2 rounded-md transition-all duration-200 active:scale-95 appearance-none
        bg-blue-600  p-2 border-gray-600 hover:bg-blue-500
        text-white
        ${props.className}
      `}
      >
        {children}
      </button>
    </Label>
  );
};

export default Button;
