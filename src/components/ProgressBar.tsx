type ProgressBarProps = {
  step: number;
  totalSteps: number;
};

export const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const progressPercentage = (step / totalSteps) * 100;
  return (
    <div className="flex h-7 w-full items-center gap-5">
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          className="bg-brand-600 h-1.5 rounded-full duration-700 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <span className="text-lg leading-7 font-semibold">
        {step}/{totalSteps}
      </span>
    </div>
  );
};
