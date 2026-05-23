const Select = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className={`
        w-full p-2 pr-8 truncate
        color-scheme-dark rounded-md border appearance-none 
         bg-gray-700 text-white border-gray-600
        bg-no-repeat bg-position-[right_0.5rem_center] bg-size-[1em] cursor-pointer
        ${props.className}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='white' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
      }}
    >
      {children}
    </select>
  );
};

export default Select;
