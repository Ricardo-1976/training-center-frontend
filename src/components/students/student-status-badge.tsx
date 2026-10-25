
import type { StudentStatus } from "@/types/student";

type StudentStatusBadgeProps = {
  status: StudentStatus;
};

export default function StudentStatusBadge({
  status,
}: StudentStatusBadgeProps) {
  const isActive = status === "ACTIVE";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-800"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {isActive ? "Ativo" : "Inativo"}
    </span>
  );
}
