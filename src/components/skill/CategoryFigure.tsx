import { Category } from '@/src/types/skill';
import { CategoryDesign } from '../icons/CategoryDesign';

type CategoryFigureProps = {
  category: Category;
  isActive: boolean;
  size: 'sm' | 'lg';
};

const sizeStyles = {
  lg: {
    radius: 'rounded-2xl',
    box: 'w-25 h-25',
    icon: 48,
  },
  sm: {
    radius: 'rounded-lg',
    box: 'w-[50px] h-[50px]',
    icon: 25,
  },
};

export const CategoryFigure = ({
  category,
  isActive,
  size,
}: CategoryFigureProps) => {
  const style = sizeStyles[size];

  return (
    <div
      className={`flex items-center justify-center ${style.box} ${style.radius} ${isActive ? 'bg-brand-200 text-brand-600' : 'bg-gray-200 text-gray-400'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <CategoryDesign size={style.icon} />
    </div>
  );
};
