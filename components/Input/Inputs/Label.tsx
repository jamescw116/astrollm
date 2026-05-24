import type { InputPropsEx } from "../Input";

import { useTheme } from "@/lib/ThemeProvider";

const Label = ({
  children,
  label,
}: React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLButtonElement
> &
  InputPropsEx) => {
  const { realTheme } = useTheme();

  return (
    <div
      className={`
        ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
        relative border border-gray-600 rounded-lg p-1 mt-4
    `}
    >
      {label && (
        <span
          className={`
            ${realTheme === "dark" ? "bg-black" : "bg-white"}
            absolute -top-3 left-2 px-1 text-xs
        `}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
};

export default Label;
