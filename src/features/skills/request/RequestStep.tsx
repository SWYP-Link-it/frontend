import { Button } from '@/src/components/Button';
import { Calendar } from '@/src/components/Calendar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ko } from 'react-day-picker/locale';
import { RequestFormData, useRequestForm } from './RequestFormProvider';
import Link from 'next/link';
import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { useFromInfoFromSearchParams } from './hooks/useFormInfoFromSearchParams';
import { api } from '@/src/lib/api/api';
import { formatDate } from '@/src/utils/date';

type RequestStepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const RequestStep = ({ step, setStep }: RequestStepProps) => {
  const { mentorId, skillId } = useFromInfoFromSearchParams();
  const { skillList, formData, setFormData } = useRequestForm();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<string[]>();
  const [availableTimes, setAvailableTimes] =
    useState<{ startTime: string; endTime: string }[]>();

  const handleSubmit = (
    mentorId: number,
    skillId: number,
    formData: RequestFormData,
  ) => {
    if (!formData.date) {
      console.error('날짜를 선택해 주세요');
      return;
    }

    if (!formData.time) {
      console.error('시간을 선택해 주세요');
      return;
    }

    api
      .post('/exchange/request', {
        mentorId,
        mentorSkillId: skillId,
        message: formData.message,
        requestedDate: formatDate(formData.date, 'YYYY-MM-DD'),
        startTime: formData.time,
      })
      .then((response) => {
        console.log(response.data.message);
        setStep((step) => step + 1);
      })
      .catch((error) => {
        const serverError = error.response?.data;
        console.error(serverError.code);
        console.error(serverError.message);
      });
  };

  const hasSlots = availableTimes && availableTimes.length > 0;

  useEffect(() => {
    const formattedMonth = formatDate(currentMonth, 'YYYY-MM');
    api
      .get(
        `/exchange/mentors/${mentorId}/available-dates?month=${formattedMonth}`,
      )
      .then((response) => {
        const { availableDates } = response.data.data;
        setAvailableDates(availableDates);
      })
      .catch((error) => {
        const serverError = error.response?.data;
        console.error(serverError.code);
        console.error(serverError.message);
      });
  }, [currentMonth, mentorId]);

  useEffect(() => {
    const formattedDate = formatDate(formData.date, 'YYYY-MM-DD');
    api
      .get(
        `/exchange/mentors/${mentorId}/available-slots?mentorSkillId=${skillId}&date=${formattedDate}`,
      )
      .then((response) => {
        const { slots } = response.data.data;
        const availableSlots = slots.filter(
          ({ isAvailable }: { isAvailable: boolean }) => isAvailable,
        );
        setAvailableTimes(
          availableSlots.map(
            ({
              startTime,
              endTime,
            }: {
              startTime: string;
              endTime: string;
            }) => ({
              startTime,
              endTime,
            }),
          ),
        );
      })
      .catch((error) => {
        const serverError = error.response?.data;
        console.error(serverError.code);
        console.error(serverError.message);
      });
  }, [formData.date, mentorId, skillId]);

  return (
    <>
      <div className="flex w-150 flex-col items-center rounded-2xl bg-white pt-[54px] pb-22">
        <p className="text-lg leading-7 font-semibold text-gray-800">
          {GUIDE_LIST[step - 1]}
        </p>
        {step === 1 && (
          <div className="mt-9 flex flex-wrap justify-center gap-[18px]">
            {skillList.map((skill) => {
              const isSelected = skillId === skill.skillId;
              return (
                <Link
                  key={skill.skillId}
                  href={`/skills/request?mentorId=${mentorId}&skillId=${skill.skillId}`}
                  replace
                  className="flex cursor-pointer flex-col items-center gap-[17px]"
                >
                  <div
                    className={`h-25 w-25 rounded-2xl ${isSelected ? 'bg-brand-200' : 'bg-gray-200'}`}
                  ></div>
                  <span
                    className={`text-center text-sm leading-[1.5] ${isSelected ? 'text-brand-600 font-semibold' : 'text-gray-700'}`}
                  >
                    {skill.skillName}
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
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              selected={formData.date}
              onSelect={(date) => setFormData({ date, time: '' })}
              disabled={(date) =>
                !availableDates?.some(
                  (d) => formatDate(date, 'YYYY-MM-DD') === d,
                )
              }
              className="h-fit w-77 p-6"
            />

            {availableTimes && availableTimes?.length > 0 && (
              <>
                <div className="mt-3 flex flex-wrap justify-center gap-6">
                  {availableTimes.map(({ startTime, endTime }) => (
                    <div
                      key={startTime}
                      className={`h-8 cursor-pointer rounded-xl px-3 py-[6px] text-sm leading-[1.5] font-medium ${startTime === formData.time ? 'bg-brand-200 text-brand-600' : 'bg-gray-200 text-gray-600'}`}
                      onClick={() => setFormData({ time: startTime })}
                    >
                      {startTime}~{endTime}
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="하고싶은 말에 대한 간단한 메세지를 남겨보세요."
                  className="mt-[42px] h-[215px] w-[490px] resize-none rounded-[15px] border border-gray-200 p-6 text-sm leading-5 text-gray-800 placeholder-gray-400 outline-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ message: e.target.value })}
                />
              </>
            )}
            {(!availableTimes || availableTimes.length === 0) && (
              <div className="flex h-[45px] w-[366px] items-center justify-center gap-[7px] rounded-xl bg-gray-200 text-sm leading-[1.5] font-medium text-gray-400">
                <AlertIcon />
                가능한 시간대가 없어요.
              </div>
            )}
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
            text="신청하기"
            mode={hasSlots ? 'active' : 'inactive'}
            onClick={() => handleSubmit(mentorId, skillId, formData)}
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
