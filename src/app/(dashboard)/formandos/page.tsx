
"use client";

import { useMemo, useState } from "react";
import StudentStatusBadge from "@/components/students/student-status-badge";
import type { Student, } from "@/types/student";

const initialStudents: Student[] = [
  {
    id: "std-004",
    name: "Paulo António",
    phone: "923000004",
    course: "Contabilidade",
    status: "ACTIVE",
  },
  {
    id: "std-001",
    name: "Ana Manuel",
    phone: "923000001",
    course: "Informática",
    status: "ACTIVE",
  },
  {
    id: "std-002",
    name: "João Pedro",
    phone: "923000002",
    course: "Programação Web",
    status: "ACTIVE",
  },
  {
    id: "std-003",
    name: "Maria José",
    phone: "923000003",
    course: "Informática",
    status: "INACTIVE",
  },  
];

export default function FormandosPage() {
  const [students] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const courses = useMemo(
    () => [...new Set(students.map((student) => student.course))],
    [students]
  );

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(term) ||
        student.phone.includes(term);

      const matchesCourse =
        selectedCourse === "Todos" ||
        student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "Todos" ||
        student.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [students, search, selectedCourse, selectedStatus]);

  const activeCount = students.filter(
    (student) => student.status === "ACTIVE"
  ).length;

  function resetFilters() {
    setSearch("");
    setSelectedCourse("Todos");
    setSelectedStatus("Todos");
  }

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Formandos
        </h1>
        <p className="mt-1 text-slate-500">
          Consulta e gestão dos formandos do centro.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">Total de formandos</p>
          <p className="mt-2 text-3xl font-bold  text-slate-500">{students.length}</p>
        </article>

        <article className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">Formandos ativos</p>
          <p className="mt-2 text-3xl font-bold  text-slate-500">{activeCount}</p>
        </article>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold  text-black">Pesquisar e filtrar</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="search" className="mb-1 block text-sm  text-slate-500">
              Nome ou telefone
            </label>
            <input
              id="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar formando..."
              className="w-full rounded-lg border p-3 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label htmlFor="course" className="mb-1 block text-sm  text-slate-500">
              Curso
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(event) => setSelectedCourse(event.target.value)}
              className="w-full rounded-lg border p-3 placeholder: text-slate-500"
            >
              <option value="Todos">Todos os cursos</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="mb-1 block text-sm  text-slate-500">
              Estado
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full rounded-lg border p-3 placeholder: text-slate-500"
            >
              <option value="Todos">Todos os estados</option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50  text-slate-500"
        >
          Limpar filtros
        </button>
      </section>

      <section className="overflow-hidden rounded-xl border bg-white">
        <div className="border-b p-5">
          <h2 className="font-semibold text-black">Lista de formandos</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredStudents.length} resultado(s) de {students.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Nome</th>
                <th className="px-5 py-3 font-medium">Telefone</th>
                <th className="px-5 py-3 font-medium">Curso</th>
                <th className="px-5 py-3 font-medium">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium  text-slate-500">
                    {student.name}
                  </td>
                  <td className="px-5 py-4  text-slate-500">{student.phone}</td>
                  <td className="px-5 py-4  text-slate-500">{student.course}</td>
                  <td className="px-5 py-4  text-slate-500">
                    <StudentStatusBadge status={student.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <p className="p-8 text-center text-slate-500">
            Nenhum formando encontrado. Experimenta alterar os filtros.
          </p>
        )}
      </section>
    </main>
  );
}
