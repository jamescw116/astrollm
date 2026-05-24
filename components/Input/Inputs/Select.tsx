import type { InputPropsEx } from "../Input";

import { useTheme } from "@/lib/ThemeProvider";

import Label from "./Label";

const Select = ({
  children,
  label,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & InputPropsEx) => {
  const { realTheme } = useTheme();

  return (
    <Label label={label}>
      <select
        {...props}
        className={`
          ${realTheme === "dark" ? "scheme-dark dark" : "scheme-light"} theme
          w-full p-2 pr-8 truncate outline-none appearance-none cursor-pointer
          bg-no-repeat bg-position-[right_0.5rem_center] bg-size-[1em]
        ${props.className}
      `}
      >
        {children}
      </select>
      {/* 這裡是 Tailwind 的箭頭，完全由 CSS 控制 */}
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg
          className="w-4 h-4 text-foreground transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </Label>
  );
};

export default Select;
