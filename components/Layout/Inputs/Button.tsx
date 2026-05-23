const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`
        color-scheme-dark
        font-semibold py-2 rounded-md transition-all duration-200 active:scale-95 appearance-none
        bg-blue-600 text-white p-2 border-gray-600 hover:bg-blue-500
        ${props.className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
