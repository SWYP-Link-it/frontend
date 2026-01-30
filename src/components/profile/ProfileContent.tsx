import { SkillItem } from './SkillItem';

interface ProfileContentProps {
  data: {
    experience: {
      title: string;
      icon: string;
    };
    skills: Array<{
      id: number;
      category: string;
      tag: string;
      level: string;
      description: string;
    }>;
    availability: {
      days: string[];
      selectedDay: string;
      slots: string[];
    };
    exchangeMethod: {
      type: 'online' | 'offline';
      preferredRegion: string;
      preferredLocation: string;
    };
  };
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center justify-between">
    <h5 className="font-bold text-gray-900">{title}</h5>
    <button className="text-xs text-gray-400 hover:text-gray-600">편집</button>
  </div>
);

export const ProfileContent = ({ data }: ProfileContentProps) => {
  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-2xl border border-gray-100 p-6">
        <SectionHeader title="경력과 경험" />
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-xl">
            {data.experience.icon}
          </div>
          <p className="text-sm font-medium text-gray-800">
            {data.experience.title}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 p-6">
        <SectionHeader title="스킬" />
        <div className="space-y-4">
          {data.skills.map((skill) => (
            <SkillItem key={skill.id} {...skill} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 p-6">
        <SectionHeader title="선호 시간대" />

        <div className="mb-6 grid grid-cols-7 overflow-hidden rounded-lg border border-gray-50">
          {data.availability.days.map((day) => (
            <button
              key={day}
              className={`border-r border-gray-50 py-3 text-sm font-medium transition-colors last:border-r-0 ${
                day === data.availability.selectedDay
                  ? 'bg-gray-50 text-gray-900'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {data.availability.slots.map((slot, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-center text-xs font-medium text-gray-800 shadow-sm"
            >
              {slot}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 p-6">
        <SectionHeader title="교환 방법" />

        <div className="mb-6 flex rounded-xl bg-gray-50 p-1">
          <button
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${data.exchangeMethod.type === 'online' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
          >
            온라인
          </button>
          <button
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${data.exchangeMethod.type === 'offline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
          >
            오프라인
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="mb-3 text-sm font-bold text-gray-900">선호 지역</p>
            <p className="text-sm text-gray-400">
              {data.exchangeMethod.preferredRegion}
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-gray-900">선호 위치</p>
            <p className="text-sm text-gray-400">
              {data.exchangeMethod.preferredLocation}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
