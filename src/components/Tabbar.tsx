type TabbarProps<T extends string | number> = {
  items: { key: T; label: string }[];
  currentItem: T;
  onClickItem: (key: T) => void;
};

export const Tabbar = <T extends string | number>({
  items,
  currentItem,
  onClickItem,
}: TabbarProps<T>) => {
  const itemIndex = items.findIndex((item) => item.key === currentItem);

  return (
    <div className="flex h-[57px] w-full flex-col justify-end">
      <div className="flex">
        {items.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onClickItem(key)}
            className="w-[90px] cursor-pointer pb-2 text-center text-lg leading-7 font-semibold text-gray-700"
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          maxWidth: `${90 * items.length}px`,
        }}
      >
        <div
          className="bg-brand-600 h-[2px] w-[90px] rounded-full duration-300 ease-in-out"
          style={{
            width: `${(1 / items.length) * 100}%`,
            marginLeft: `${(itemIndex / items.length) * 100}%`,
            // transform: `translateX(${itemIndex * 90}px)`,
          }}
        ></div>
      </div>

      <div className="bg-brand-200 h-[1px] w-full rounded-full"></div>
    </div>
  );
};
