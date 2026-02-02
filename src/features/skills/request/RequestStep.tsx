import { Button } from '@/src/components/Button';
import { Calendar } from '@/src/components/Calendar';
import { Dispatch, SetStateAction } from 'react';
import { ko } from 'react-day-picker/locale';
import { useRequestForm } from './RequestFormProvider';
import Link from 'next/link';
import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { useFromInfoFromSearchParams } from './hooks/useFormInfoFromSearchParams';

type RequestStepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const RequestStep = ({ step, setStep }: RequestStepProps) => {
  const { skillId } = useFromInfoFromSearchParams();
  const { skillList, formData, setFormData } = useRequestForm();

  // const availableTimes = ['16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00'];
  const availableTimes: string[] = [];

  const canProgress = availableTimes && availableTimes.length > 0;

  return (
    <>
      <div className="flex w-150 flex-col items-center rounded-2xl bg-white pt-[54px] pb-22">
        <p className="text-lg leading-[28px] font-semibold text-gray-800">
          {GUIDE_LIST[step - 1]}
        </p>
        {step === 1 && (
          <div className="mt-9 flex flex-wrap justify-center gap-[18px]">
            {skillList.map((skill) => {
              const isSelected = skillId === skill.id;
              return (
                <Link
                  key={skill.id}
                  href={`/skills/request?mentorId=${skill.profile.id}&skillId=${skill.id}`}
                  replace
                  className="flex cursor-pointer flex-col items-center gap-[17px]"
                >
                  <div
                    className={`h-25 w-25 rounded-2xl ${isSelected ? 'bg-brand-200' : 'bg-gray-200'}`}
                  ></div>
                  <span
                    className={`text-center text-sm leading-[1.5] ${isSelected ? 'text-brand-600 font-semibold' : 'text-gray-700'}`}
                  >
                    {skill.title}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
        {step === 2 && (
          <div className="mt-[18px] flex w-full flex-col items-center">
            <Calendar
              mode="single"
              locale={ko}
              selected={formData.date}
              onSelect={(date) => setFormData({ date, time: '' })}
              className="h-fit w-77 p-6"
            />

            {availableTimes?.length > 0 && (
              <>
                <div className="mt-3 flex flex-wrap gap-6">
                  {availableTimes.map((t) => (
                    <div
                      key={t}
                      className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600"
                      onClick={() => setFormData({ time: t })}
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
                  <AlertIcon />
                  가능한 시간대가 없어요.
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
        {step === 1 && (
          <Button
            text="다음으로"
            mode="active"
            onClick={() => setStep((step) => step + 1)}
          />
        )}
        {step === 2 && (
          <Button
            text="다음으로"
            mode={canProgress ? 'active' : 'inactive'}
            onClick={() => setStep((step) => step + 1)}
          />
        )}
      </div>
    </>
  );
};

const GUIDE_LIST = [
  '어떤 스킬로 진행하고 싶으신가요?',
  '어떤 날짜 및 시간에 진행하고 싶으신가요?',
];
