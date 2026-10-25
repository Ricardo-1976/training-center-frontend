
export type StudentStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface Student {
  uuid: string;
  name: string;
  phone: string;
  course: string;
  status: StudentStatus;
}
