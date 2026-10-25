import { Student } from "@/types/student";
import studentsData from "./students.json";

export async function getMockStudents(
  signal?: AbortSignal
): Promise<Student[]> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Pedido cancelado", "AbortError"));
      return;
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve(studentsData as Student[]);
    }, 600);

    function handleAbort() {
      clearTimeout(timeout);
      reject(new DOMException("Pedido cancelado", "AbortError"));
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}
