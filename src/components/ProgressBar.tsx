type ProgressBarProps = {
  /** 현재 단계 */
  step: number;
  /** 총 단계 수 */
  totalSteps: number;
};

export const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const progressPercentage = (step / totalSteps) * 100;
  return (
    <div className="flex h-7 w-full items-center gap-[22px]">
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-linear-to-r from-[#5E9EFF] to-[#784FF7] duration-700 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <span className="text-lg leading-7 font-semibold">
        {step}/{totalSteps}
      </span>
    </div>
  );
};
