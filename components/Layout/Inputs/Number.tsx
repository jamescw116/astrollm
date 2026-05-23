import Input from "./Input";

const InputNumber = ({
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <Input
    {...props}
    type="number"
    className={`appearance-auto ${props.className}`}
  >
    {children}
  </Input>
);

export default InputNumber;
