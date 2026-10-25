
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import StudentStatusBadge from "@/components/students/student-status-badge";
import type { Student } from "@/types/student";
import { getMockStudents } from "@/mocks/students/students-api";

export default function FormandosPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  // Carregar os formandos através da API fictícia.
  const loadStudents = useCallback(async (signal: AbortSignal) => {
    try {
      const data = await getMockStudents(signal);

      if (!signal.aborted) {
        setStudents(data);
      }
    } catch (err) {
      if (signal.aborted) return;

      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao carregar os formandos."
      );
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Executar o carregamento inicial e quando o utilizador tentar novamente.
  useEffect(() => {
    const controller = new AbortController();

    void loadStudents(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadStudents, retry]);

  // Obter os cursos existentes sem duplicados.
  const courses = useMemo(
    () => [...new Set(students.map((student) => student.course))],
    [students]
  );

  // Aplicar pesquisa, filtro por curso e filtro por estado.
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

  // Calcular os indicadores.
  const activeCount = useMemo(
    () => students.filter((student) => student.status === "ACTIVE").length,
    [students]
  );

  const inactiveCount = useMemo(
    () => students.filter((student) => student.status === "INACTIVE").length,
    [students]
  );

  function resetFilters() {
    setSearch("");
    setSelectedCourse("Todos");
    setSelectedStatus("Todos");
  }

  function handleRetry() {
    setError("");
    setLoading(true);
    setRetry((value) => value + 1);
  }

  return (
    <main className="space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Formandos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Consulta e gestão dos formandos do centro de formação.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRetry}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "A carregar..." : "Atualizar lista"}
        </button>
      </div>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total de formandos
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {students.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Formandos ativos
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Formandos inativos
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-600">
            {inactiveCount}
          </p>
        </div>
      </section>

      {/* Pesquisa e filtros */}
      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-semibold text-gray-900">
            Pesquisar e filtrar
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Pesquisa por nome ou telefone e filtra por curso e estado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="student-search"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Nome ou telefone
            </label>
            <input
              id="student-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar formando..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="course-filter"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Curso
            </label>
            <select
              id="course-filter"
              value={selectedCourse}
              onChange={(event) => setSelectedCourse(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-500"
            >
              <option value="Todos">Todos os cursos</option>
              {courses.map((course) => (
                <option key={course} value={course} className="text-gray-500">
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-500"
            >
              <option value="Todos">Todos os estados</option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="SUSPENDED">Suspenso</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {filteredStudents.length}{" "}
            {filteredStudents.length === 1
              ? "formando encontrado"
              : "formandos encontrados"}
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="self-start text-sm font-medium text-blue-600 hover:text-blue-800 sm:self-auto"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      {/* Lista de formandos */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Lista de formandos
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div
              className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
              role="status"
              aria-label="A carregar"
            />
            <p className="mt-4 text-sm text-gray-500">
              A carregar os formandos...
            </p>
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-red-600">
              Não foi possível carregar os formandos.
            </p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-gray-900">
              Nenhum formando encontrado.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Altera a pesquisa ou os filtros para veres outros resultados.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Formando</th>
                  <th className="px-5 py-3 font-medium">Telefone</th>
                  <th className="px-5 py-3 font-medium">Curso</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.uuid}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {student.phone || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {student.course || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <StudentStatusBadge status={student.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
