import { useTheme } from "@/lib/ThemeProvider";

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { realTheme } = useTheme();

  return (
    <button
      {...props}
      className={`
        ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
        cursor-pointer
        font-semibold py-2 rounded-md transition-all duration-200 active:scale-95 appearance-none
        bg-blue-600 p-2 border-gray-600 hover:bg-blue-500
        text-white
        ${props.className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
