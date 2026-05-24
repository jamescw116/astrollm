import Input from "./Text";

const Number = ({
  children,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => (
  <Input
    {...props}
    type="number"
    label={label}
    className={`appearance-auto ${props.className}`}
  >
    {children}
  </Input>
);

export default Number;
