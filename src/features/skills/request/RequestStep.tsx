import { Button } from '@/src/components/Button';
import { Calendar } from '@/src/components/Calendar';
import { Dispatch, SetStateAction, useState } from 'react';
import { ko } from 'react-day-picker/locale';

type RequestStepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const RequestStep = ({ step, setStep }: RequestStepProps) => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  const availableTimes = ['16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00'];
  // const availableTimes: string[] = [];

  const canProgress = availableTimes && availableTimes.length > 0;

  return (
    <>
      <div className="flex w-150 flex-col items-center rounded-2xl bg-white pt-[54px] pb-22">
        <p className="text-lg leading-[28px] font-semibold text-gray-800">
          {GUIDE_LIST[step - 1]}
        </p>
        {step === 1 && (
          <div className="mt-9 flex gap-[18px]">
            <div className="flex cursor-pointer flex-col items-center gap-[17px]">
              <div className="h-25 w-25 rounded-2xl bg-gray-200"></div>
              <span className="text-sm leading-[1.5] text-gray-700">
                그래픽디자인
              </span>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-[17px]">
              <div className="h-25 w-25 rounded-2xl bg-gray-200"></div>
              <span className="text-sm leading-[1.5] text-gray-700">
                인테리어디자인
              </span>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-[17px]">
              <div className="bg-brand-200 h-25 w-25 rounded-2xl"></div>
              <span className="text-brand-600 text-sm leading-[1.5] font-semibold">
                게임디자인
              </span>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="mt-[18px] flex w-full flex-col items-center">
            <Calendar
              mode="single"
              locale={ko}
              selected={selected}
              onSelect={setSelected}
              className="h-fit w-77 p-6"
            />

            {availableTimes?.length > 0 && (
              <>
                <div className="mt-3 flex flex-wrap gap-6">
                  {availableTimes.map((t) => (
                    <div
                      key={t}
                      className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="하고싶은 말에 대한 간단한 메세지를 남겨보세요."
                  className="mt-[42px] h-[215px] w-[490px] resize-none rounded-[15px] border border-gray-200 p-6 text-sm leading-5 text-gray-800 placeholder-gray-400 outline-none"
                />
              </>
            )}
            {!availableTimes ||
              (availableTimes.length === 0 && (
                <div className="flex h-[45px] w-[366px] items-center justify-center gap-[7px] rounded-xl bg-gray-200 text-sm leading-[1.5] font-medium text-gray-400">
                  <span>i</span>가능한 시간대가 없어요.
                </div>
              ))}
          </div>
        )}
        {step === 3 && (
          <div className="mt-[18px] flex w-full flex-col items-center">
            스킬 요청서 작성 완료!
          </div>
        )}
      </div>
      <div className="mt-[74px] w-[380px]">
        <Button
          text="다음으로"
          mode={canProgress ? 'active' : 'inactive'}
          onClick={() => setStep((step) => step + 1)}
        />
      </div>
    </>
  );
};

const GUIDE_LIST = [
  '어떤 스킬로 진행하고 싶으신가요?',
  '어떤 날짜 및 시간에 진행하고 싶으신가요?',
];
