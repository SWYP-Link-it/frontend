'use client';

import { api } from '@/src/lib/api/api';
import { SkillInfo } from '@/src/types/skill';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { CursorBoxIcon } from '@/src/components/icons/CursorBoxIcon';
import { ClockIcon } from '@/src/components/icons/ClockIcon';
import Link from 'next/link';
import { Calendar } from '@/src/components/Calendar';
import { ko } from 'react-day-picker/locale';
import { formatDate } from '@/src/utils/date';
import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { Button } from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import { useFormInfoFromSearchParams } from './hooks/useFormInfoFromSearchParams';
import { toast } from 'sonner';
import { useUserInfoStore } from '@/src/stores/userInfoStore';
import { ScrollToTop } from '@/src/components/ScrollToTop';

export type RequestFormData = {
  date: Date;
  time: string;
  message: string;
};

export default function SkillRequestClient() {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const { mentorId, skillId } = useFormInfoFromSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    message: '',
  });
  const [skillList, setSkillList] = useState<SkillInfo[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<string[]>();
  const [availableTimes, setAvailableTimes] =
    useState<{ startTime: string; endTime: string }[]>();

  const selectedSkillInfo = skillList.find(
    (skill) => skill.skillId === skillId,
  );

  const handleFormUpdate = (data: Partial<RequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const fetchUserInfo = () => {
    api.get(`/credits/balance-user-details`).then((response) => {
      const { userId, userNickname, creditBalance } = response.data.data;
      setUserInfo({ userId, userNickname, creditBalance });
    });
  };

  const handleSubmit = (
    mentorId: number,
    skillId: number,
    formData: RequestFormData,
  ) => {
    if (!formData.date) {
      toast.error('날짜를 선택해 주세요');
      return;
    }

    if (!formData.time) {
      toast.error('시간을 선택해 주세요');
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
      .then(() => {
        toast.success('신청이 완료되었습니다!');
        fetchUserInfo();
        router.push('/skills');
      })
      .catch((error) => {
        const serverError = error.response?.data;
        toast(serverError.message);
      });
  };

  const isFormCompleted = Boolean(formData.date && formData.time);

  useEffect(() => {
    if (!mentorId) return;

    api
      .get(`/exchange/mentors/${mentorId}/skills`)
      .then((response) => {
        setSkillList(response.data.data);
      })
      .catch((error) => {
        const serverError = error.response?.data;
        toast.error(serverError.message);
      });
  }, []);

  useEffect(() => {
    if (!mentorId || !currentMonth) return;
    const formattedMonth = formatDate(currentMonth, 'YYYY-MM');
    api
      .get(
        `/exchange/mentors/${mentorId}/available-dates?mentorSkillId=${skillId}&month=${formattedMonth}`,
      )
      .then((response) => {
        const { availableDates } = response.data.data;
        setAvailableDates(availableDates);
      })
      .catch((error) => {
        const serverError = error.response?.data;
        toast.error(serverError.message);
      });
  }, [currentMonth, skillId, mentorId]);

  useEffect(() => {
    if (!mentorId || !skillId || !formData.date) return;
    const formattedDate = formatDate(formData.date, 'YYYY-MM-DD');
    api
      .get(
        `/exchange/mentors/${mentorId}/available-slots?mentorSkillId=${skillId}&date=${formattedDate}`,
      )
      .then((response) => {
        const { slots } = response.data.data;
        setAvailableTimes(
          slots.map(
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
        toast.error(serverError.message);
      });
  }, [formData.date, mentorId, skillId]);

  if (!mentorId) {
    return <div>경고: 잘못된 경로입니다.</div>;
  }

  return (
    <>
      <div className="flex h-full flex-col bg-[#F8FAFE]">
        <div className="w-full bg-white">
          <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 items-center justify-between">
            <div className="flex flex-col gap-[2px] pt-[22px] pb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                스킬 요청서 작성
              </h1>
              <div className="text-xs font-medium text-gray-400">
                사용자님에게 스킬을 배우기 위한 요청서를 작성해요.
              </div>
            </div>
            <div className="flex h-fit">
              <div className="flex flex-col gap-[6px]">
                <div className="text-sm font-medium text-gray-400">
                  스킬 거래 시간
                </div>
                <div className="text-base font-semibold text-gray-700">
                  {selectedSkillInfo?.exchangeDuration}분
                </div>
              </div>
              <div className="mx-13 h-[43px] w-[1px] rounded-full bg-gray-200"></div>
              <div className="mr-13 flex flex-col gap-[6px]">
                <div className="text-sm font-medium text-gray-400">
                  사용 크레딧
                </div>
                <div className="text-base font-semibold text-gray-700">
                  {selectedSkillInfo?.creditPrice} 크레딧
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 gap-5 pt-9 pb-[94px]">
          <div className="flex w-[753px] flex-col gap-18 rounded-2xl bg-white px-9 py-[54px]">
            <FormSection
              icon={<CursorBoxIcon size={18} />}
              title={'어떤 스킬로 진행하고 싶으신가요?'}
            >
              <div className="flex gap-[18px] overflow-x-auto">
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
                        className={`text-center text-sm ${isSelected ? 'text-brand-600 font-semibold' : 'text-gray-700'}`}
                      >
                        {skill.skillName}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </FormSection>
            <FormSection
              icon={<ClockIcon size={18} />}
              title={'어떤 날짜 및 시간에 진행하고 싶으신가요?'}
            >
              <div className="flex flex-col gap-12">
                <div className="flex gap-10">
                  <Calendar
                    mode="single"
                    locale={ko}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    selected={formData.date}
                    onSelect={(date) => handleFormUpdate({ date, time: '' })}
                    disabled={(date) =>
                      !availableDates?.some(
                        (d) => formatDate(date, 'YYYY-MM-DD') === d,
                      )
                    }
                    className="h-fit w-60 p-6"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-gray-600">
                    {formatDate(formData.date, 'M월 D일')}
                  </div>
                  <div className="flex gap-6">
                    {availableTimes && availableTimes?.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {availableTimes.map(({ startTime, endTime }) => (
                          <div
                            key={startTime}
                            className={`h-9 cursor-pointer rounded-xl border px-3 py-[7.5px] text-sm font-medium ${startTime === formData.time ? 'bg-brand-50 text-brand-600 border-brand-600' : 'border-gray-200 bg-white text-gray-700'}`}
                            onClick={() =>
                              handleFormUpdate({ time: startTime })
                            }
                          >
                            {startTime}~{endTime}
                          </div>
                        ))}
                      </div>
                    )}
                    {(!availableTimes || availableTimes.length === 0) && (
                      <div className="flex h-[45px] w-full items-center justify-center gap-[7px] rounded-xl bg-gray-200 text-sm font-medium text-gray-400">
                        <AlertIcon />
                        가능한 시간대가 없어요.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FormSection>
          </div>

          <div className="flex h-fit flex-1 flex-col rounded-2xl bg-white px-6 pt-9 pb-7">
            <div className="mb-6 text-lg font-semibold text-gray-800">
              추가적으로 하고싶은 말
            </div>
            <textarea
              placeholder="하고싶은 말에 대한 간단한 메세지를 남겨보세요."
              className="mb-9 h-[215px] resize-none rounded-[15px] border border-gray-200 p-6 text-sm text-gray-800 placeholder-gray-400 outline-none"
              value={formData.message}
              onChange={(e) => handleFormUpdate({ message: e.target.value })}
            />
            <Button
              text="작성 완료"
              mode={isFormCompleted ? 'active' : 'inactive'}
              onClick={() => handleSubmit(mentorId, skillId, formData)}
            />
          </div>
        </div>
      </div>
      <ScrollToTop deps={[]} />
    </>
  );
}

const FormSection = ({
  icon,
  title,
  children,
}: {
  icon: ReactElement;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-2 text-gray-800">
        {icon}
        <div className="text-lg font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
};
