import { api } from '@/src/lib/api/api';
import { SkillInfo } from '@/src/types/skill';
import { formatDate } from '@/src/utils/date';

export const getMentorSkills = async (mentorId: number) => {
  const response = await api.get<{ data: SkillInfo[] }>(
    `/exchange/mentors/${mentorId}/skills`,
  );
  return response.data.data;
};

export const getAvailableDates = async (
  mentorId: number,
  skillId: number,
  month: Date,
) => {
  const response = await api.get<{ data: { availableDates: string[] } }>(
    `/exchange/mentors/${mentorId}/available-dates?mentorSkillId=${skillId}&month=${formatDate(month, 'YYYY-MM')}`,
  );
  return response.data.data.availableDates;
};

export const getAvailableTimes = async (
  mentorId: number,
  skillId: number,
  date: Date,
) => {
  const response = await api.get<{
    data: { slots: { startTime: string; endTime: string }[] };
  }>(
    `/exchange/mentors/${mentorId}/available-slots?mentorSkillId=${skillId}&date=${formatDate(date, 'YYYY-MM-DD')}`,
  );
  return response.data.data.slots;
};

export const requestSkillExchange = async (body: {
  mentorId: number;
  skillId: number;
  message?: string;
  date: Date;
  time: string;
}) => {
  return api.post('/exchange/request', {
    mentorId: body.mentorId,
    mentorSkillId: body.skillId,
    message: body.message,
    requestedDate: formatDate(body.date, 'YYYY-MM-DD'),
    startTime: body.time,
  });
};
