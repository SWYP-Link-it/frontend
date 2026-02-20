'use client';

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
import { ScrollToTop } from '@/src/components/ScrollToTop';
import { CategoryFigure } from '@/src/components/skill/CategoryFigure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileQueryKey } from '../../profile/queryKeys';
import {
  getAvailableDates,
  getAvailableTimes,
  getMentorSkills,
  requestSkillExchange,
} from './api';
import { isAxiosError } from 'axios';

export type RequestFormData = {
  date: Date;
  time: string;
  message: string;
};

export default function SkillRequestClient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mentorId, skillId } = useFormInfoFromSearchParams();

  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    message: '',
  });
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { mutate: requestExchange, isPending: isRequestPending } = useMutation({
    mutationFn: requestSkillExchange,
    onSuccess: () => {
      toast.success('신청이 완료되었습니다!');
      queryClient.invalidateQueries({
        queryKey: [profileQueryKey.creditBalance],
      });
      router.push('/skills');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const serverError = error.response?.data;
        if (serverError?.code === 'C006') {
          toast.error(serverError.data[0].message);
          return;
        }
        if (serverError?.message) {
          toast.error(serverError.message);
          return;
        }
      }
      toast.error('신청에 실패하였습니다.');
      console.error(error);
    },
  });

  const {
    data: skillsData,
    isError: isSkillsError,
    error: skillsError,
  } = useQuery({
    queryKey: ['exchange', 'mentorSkills', mentorId],
    queryFn: () => getMentorSkills(mentorId!),
    enabled: Boolean(mentorId),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  const {
    data: availableDatesData,
    isError: isAvailableDatesError,
    error: availableDatesError,
  } = useQuery({
    queryKey: ['exchange', 'availableDates', mentorId, skillId, currentMonth],
    queryFn: () => getAvailableDates(mentorId!, skillId!, currentMonth),
    enabled: Boolean(mentorId) && Boolean(skillId),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  const {
    data: availableTimesData,
    isError: isAvailableTimesError,
    error: availableTimesError,
  } = useQuery({
    queryKey: ['exchange', 'availableTimes', mentorId, skillId, formData.date],
    queryFn: () => getAvailableTimes(mentorId!, skillId!, formData.date),
    enabled: Boolean(mentorId) && Boolean(skillId),
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  const handleFormUpdate = (data: Partial<RequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = (
    mentorId: number,
    skillId: number,
    formData: RequestFormData,
  ) => {
    if (isRequestPending) return;

    if (!formData.date) {
      toast.error('날짜를 선택해 주세요');
      return;
    }

    if (!formData.time) {
      toast.error('시간을 선택해 주세요');
      return;
    }

    requestExchange({
      mentorId,
      skillId,
      message: formData.message,
      date: formData.date,
      time: formData.time,
    });
  };

  const selectedSkillInfo = skillsData
    ? skillsData.find((skill) => skill.skillId === skillId)
    : undefined;

  const isFormCompleted = Boolean(formData.date && formData.time);

  useEffect(() => {
    if (isSkillsError && skillsError) {
      if (isAxiosError(skillsError)) {
        const serverError = skillsError.response?.data;
        toast.error(serverError?.message || '스킬 정보를 불러올 수 없습니다.');
      } else {
        toast.error('스킬 정보를 불러올 수 없습니다.');
      }
      return;
    }
  }, [isSkillsError, skillsError]);

  useEffect(() => {
    if (isAvailableDatesError && availableDatesError) {
      if (isAxiosError(availableDatesError)) {
        const serverError = availableDatesError.response?.data;
        toast.error(serverError?.message || '날짜 정보를 불러올 수 없습니다.');
      } else {
        toast.error('날짜 정보를 불러올 수 없습니다.');
      }
      return;
    }
  }, [isAvailableDatesError, availableDatesError]);

  useEffect(() => {
    if (isAvailableTimesError && availableTimesError) {
      if (isAxiosError(availableTimesError)) {
        const serverError = availableTimesError.response?.data;
        toast.error(serverError?.message || '시간 정보를 불러올 수 없습니다.');
      } else {
        toast.error('시간 정보를 불러올 수 없습니다.');
      }
      return;
    }
  }, [isAvailableTimesError, availableTimesError]);

  if (!mentorId) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-lg text-gray-700">
        <AlertIcon size={20} />
        잘못된 경로입니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#F8FAFE]">
        <div className="w-full bg-white">
          <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 items-center justify-between">
            <div className="flex flex-col gap-[2px] pt-[22px] pb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                스킬 요청서 작성
              </h1>
              <div className="text-xs font-medium text-gray-400">
                {selectedSkillInfo?.nickname}님에게 스킬을 배우기 위한 요청서를
                작성해요.
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
                {skillsData &&
                  skillsData.map((skill) => {
                    const isSelected = skillId === skill.skillId;
                    return (
                      <Link
                        key={skill.skillId}
                        href={`/skills/request?mentorId=${mentorId}&skillId=${skill.skillId}`}
                        replace
                        className="flex cursor-pointer flex-col items-center gap-[17px]"
                      >
                        <CategoryFigure
                          category={skill.skillCategoryType}
                          isActive={isSelected}
                          size="lg"
                        />
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
                      availableDatesData
                        ? !availableDatesData.some(
                            (d) => formatDate(date, 'YYYY-MM-DD') === d,
                          )
                        : true
                    }
                    className="h-fit w-60 p-6"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-gray-600">
                    {formatDate(formData.date, 'M월 D일')}
                  </div>
                  <div className="flex gap-6">
                    {availableTimesData && availableTimesData?.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {availableTimesData.map(({ startTime, endTime }) => (
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
                    {(!availableTimesData ||
                      availableTimesData.length === 0) && (
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
              onClick={() => {
                if (!skillId) return;
                handleSubmit(mentorId, skillId, formData);
              }}
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
