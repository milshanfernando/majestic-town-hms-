type Props = {
  style?: string;
  name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ style, name, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={` hover:scale-105 rounded-[10px] ${style} text-center`}
    >
      <p>{name}</p>
    </button>
  );
};

export default Button;
