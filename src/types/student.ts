export type StudentStatus = "ACTIVE" | "INACTIVE";

export type Student = {
  id: string;
  name: string;
  phone: string;
  course: string;
  status: StudentStatus;
};
