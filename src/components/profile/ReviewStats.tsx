import { Star } from 'lucide-react';

export const ReviewStats = ({ rating }: { rating: number }) => (
  <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    <span className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
      평균 평점
    </span>
    <span className="text-2xl font-black text-gray-900">
      {rating.toFixed(1)}
    </span>
    <div className="mt-1 flex gap-0.5 text-orange-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(rating) ? 'currentColor' : 'transparent'}
          className={i < Math.floor(rating) ? '' : 'text-gray-200'}
        />
      ))}
    </div>
  </div>
);
