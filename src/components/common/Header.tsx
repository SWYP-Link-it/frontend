import Image from 'next/image';
import { Input } from '@/src/components/Input';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-[112px] py-5">
      {/* TODO: 로고 바뀌면 재조정 */}
      <Image src="/icons/logo.svg" alt="logo" width={67} height={26} />
      <div className="h-[37px] w-[342px]">
        {/* TODO: 검색어 Input padding이 공통 컴포넌트 padding이랑 다름 */}
        <Input placeholder="찾는 스킬을 입력해주세요 ." />
      </div>
    </header>
  );
};
