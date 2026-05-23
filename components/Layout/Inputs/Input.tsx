const Input = ({
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`
        color-scheme-dark
        w-full rounded-md border appearance-none
        bg-gray-700 text-white p-2 border-gray-600
        ${props.className}
      `}
    >
      {children}
    </input>
  );
};

export default Input;
