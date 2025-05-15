import { Heading } from "@/shared/ui/Heading";
import { ProjectMember } from "@/entities/Project";
import { MemberCard } from "./MemberCard";
import { User } from "@/entities/User";

export function MembersSection({
  mentor,
  members,
}: {
  mentor: User | null;
  members: ProjectMember[];
}) {
  return (
    <section className="mt-10">
      <Heading level={3}>Проектная команда</Heading>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentor && <MemberCard member={mentor as ProjectMember} isMentor />}
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
