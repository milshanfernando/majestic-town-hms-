type Props = {
  bgColor?: string;
  iconBgColor?: string;
  title: string;
  icon: string;
  precentage: number;
  growUp: boolean;
  count: number;
};

const Card = ({
  bgColor,
  iconBgColor,
  title,
  icon,
  precentage,
  growUp,
  count,
}: Props) => {
  return (
    <div className={`rounded-2xl p-5 ${bgColor} flex flex-col gap-2`}>
      <div className="flex gap-2">
        <div
          className={`w-10 h-10 rounded-[10px] p-1 flex justify-center items-center ${iconBgColor}`}
        >
          <img className=" object-contain" src={icon} alt="" />
        </div>
        <div className=" flex justify-center items-center">
          <h3 className=" text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="flex relative">
        <div className=" flex flex-col grow justify-center ps-5">
          <div className="flex gap-2 text-sm">
            <p>{precentage}%</p>
            <img
              className="w-5"
              src={`../../public/images/${growUp ? "up.png" : "trend.png"}`}
              alt="growth"
            />
          </div>
          <p className="text-xs text-gray-800">Last 7 days</p>
        </div>
        <div>
          <h1 className=" w-2/5 text-6xl font-bold">{count}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
