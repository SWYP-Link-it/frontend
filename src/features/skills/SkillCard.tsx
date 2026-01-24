type SkillCardProps = {
  skill: {
    nickname: string;
    title: string;
    description: string;
    rate: number;
  };
};

export const SkillCard = ({ skill }: SkillCardProps) => {
  const { nickname, title, description, rate } = skill;
  return (
    <div className="flex flex-col">
      <div>{nickname}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{rate}</div>
    </div>
  );
};
