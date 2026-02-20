import { Category } from '@/src/types/skill';
import { DesignFigure } from '../icons/category/DesignFigure';
import { MarketingFigure } from '../icons/category/MarketingFigure';
import { LanguageFigure } from '../icons/category/LanguageFigure';
import { FinanceFigure } from '../icons/category/FinanceFigure';
import { SportsFigure } from '../icons/category/SportsFigure';
import { DevelopmentFigure } from '../icons/category/DevelopmentFigure';
import { MusicFigure } from '../icons/category/MusicFigure';
import { EtcFigure } from '../icons/category/EtcFigure';

type CategoryFigureProps = {
  category: Exclude<Category, 'ALL'>;
  isActive: boolean;
  size: 'sm' | 'lg';
};

export const CategoryFigure = ({
  category,
  isActive,
  size,
}: CategoryFigureProps) => {
  const style = sizeStyles[size];
  const Figure = figureMap[category];

  return (
    <div
      className={`flex items-center justify-center ${style.box} ${style.radius} ${isActive ? 'bg-brand-200 text-brand-600' : 'bg-gray-200 text-gray-400'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Figure size={style.icon} />
    </div>
  );
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

const figureMap: Record<
  Exclude<Category, 'ALL'>,
  React.ComponentType<{ size: number }>
> = {
  DEVELOPMENT: DevelopmentFigure,
  DESIGN: DesignFigure,
  EDITING: DesignFigure,
  MARKETING: MarketingFigure,
  LANGUAGE: LanguageFigure,
  FINANCE: FinanceFigure,
  SPORTS: SportsFigure,
  MUSIC: MusicFigure,
  ETC: EtcFigure,
};
