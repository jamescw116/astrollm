import type { InputPropsEx } from "../Input";

import { useTheme } from "@/lib/ThemeProvider";

import Label from "./Label";

const Text = ({
  children,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & InputPropsEx) => {
  const { realTheme } = useTheme();

  return (
    <Label label={label}>
      <input
        {...props}
        className={`
          ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
          w-full appearance-none p-2 outline-none
        ${props.className}
      `}
      >
        {children}
      </input>
    </Label>
  );
};

export default Text;
