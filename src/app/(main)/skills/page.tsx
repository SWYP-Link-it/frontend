import { CreditInfoBanner } from '@/src/features/skills/CreditInfoBanner';
import { SkillCategories } from '@/src/features/skills/SkillCategories';
import { SkillList } from '@/src/features/skills/SkillList';
export default function Skills() {
  return (
    <div className="flex flex-col px-28">
      <div>
        <h1>스킬 게시판</h1>
        <span>게시글을 확인하고 진짜 실력자에게 스킬을 배워보세요!</span>
      </div>
      <SkillCategories />
      <CreditInfoBanner />
      <SkillList />
    </div>
  );
}
