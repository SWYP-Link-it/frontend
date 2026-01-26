type TabbarProps = {
  items: readonly string[];
  currentItem: string;
  onClickItem: (item: string) => void;
};

export const Tabbar = ({ items, currentItem, onClickItem }: TabbarProps) => {
  const itemIndex = items.indexOf(currentItem);

  return (
    <div className="w-full">
      <div className="flex">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onClickItem(item)}
            className="w-[90px] cursor-pointer pb-2 text-center text-lg leading-7 font-semibold text-gray-700"
          >
            {item}
          </button>
        ))}
      </div>
      <div
        className="bg-brand-600 h-[2px] w-[90px] rounded-full duration-300 ease-in-out"
        style={{
          transform: `translateX(${itemIndex * 90}px)`,
        }}
      ></div>
      <div className="bg-brand-200 h-[1px] w-full rounded-full"></div>
    </div>
  );
};
