import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어(오전/오후) 설정
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

// 플러그인 장착
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('ko'); // 한국어 설정 적용

export const formatMessageDate = (dateString: string): string => {
  const date = dayjs(dateString);

  // 1. 오늘이면: "오전 9:15"
  if (date.isToday()) {
    return date.format('A h:mm');
  }

  // 2. 어제면: "어제"
  if (date.isYesterday()) {
    return '어제';
  }

  // 3. 그 외: "2024.01.16"
  return date.format('YYYY.MM.DD');
};
