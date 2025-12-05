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
  // precentage,
  // growUp,
  count,
}: Props) => {
  return (
    <div className={`rounded-2xl p-5 ${bgColor} flex justify-between gap-5`}>
      <div className="flex flex-col gap-2">
        <h3 className=" text-sm md:text-lg font-semibold">{title}</h3>
        <div
          className={`w-5 h-5 md:w-8 md:h-8 rounded-[6px] md:rounded-[10px] p-1 flex justify-center items-center ${iconBgColor}`}
        >
          <img className=" object-contain" src={icon} alt="" />
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <h1 className="text-3xl md:text-5xl font-bold text-center">{count}</h1>
      </div>
      {/* <div className="flex gap-2">
        <div className=" flex justify-center items-center">
          <h3 className=" font-semibold">{title}</h3>
        </div>
      </div>
      <div className="flex justify-between items-center relative">
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
         
        </div>
        <div
          className={`w-8 h-8 rounded-[10px] p-1 flex justify-center items-center ${iconBgColor}`}
        >
          <img className=" object-contain" src={icon} alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default Card;
