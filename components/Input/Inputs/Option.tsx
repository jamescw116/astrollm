import { useTheme } from "@/lib/ThemeProvider";

const Option = ({
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  const { realTheme } = useTheme();

  return (
    <option
      {...props}
      className={`
        ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
        p-2 bg-(--background) text-(--foreground)
        ${props.className}
        `}
    >
      {children}
    </option>
  );
};

export default Option;
