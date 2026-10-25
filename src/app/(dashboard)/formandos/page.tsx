
"use client";

import { useState } from "react";

type Formando = {
  id: number;
  nome: string;
  telefone: string;
  curso: string;
};

const cursosDisponiveis = [
  "Informática",
  "Programação Web",
  "Contabilidade",
];

export default function FormandosPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState(cursosDisponiveis[0]);
  const [pesquisa, setPesquisa] = useState("");
  const [erro, setErro] = useState("");

  const [formandos, setFormandos] = useState<Formando[]>([]);

  function adicionarFormando(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim() || !telefone.trim() || !curso) {
      setErro("Preenche todos os campos obrigatórios.");
      return;
    }

    const novoFormando: Formando = {
      id: Date.now(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      curso,
    };

    setFormandos((atuais) => [...atuais, novoFormando]);

    setNome("");
    setTelefone("");
    setCurso(cursosDisponiveis[0]);
    setErro("");
  }

  function excluirFormando(id: number) {
    const confirmar = window.confirm(
      "Tens a certeza de que pretendes excluir este formando?"
    );

    if (!confirmar) return;

    setFormandos((atuais) =>
      atuais.filter((formando) => formando.id !== id)
    );
  }

  const formandosFiltrados = formandos.filter((formando) =>
    formando.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-black">Formandos</h1>
        <p className="mt-1 text-slate-500">
          Regista e consulta os formandos do centro de formação.
        </p>
      </header>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-black">
          Registar formando
        </h2>

        <form onSubmit={adicionarFormando} className="space-y-4">
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-black">
              Nome completo
            </label>
            <input
              id="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Nome do formando"
              className="w-full rounded-lg border p-3 placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1 block text-sm font-medium text-black">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Ex.: 923000000"
              className="w-full rounded-lg border p-3 placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label htmlFor="curso" className="mb-1 block text-sm font-medium text-black">
              Curso
            </label>
            <select
              id="curso"
              value={curso}
              onChange={(event) => setCurso(event.target.value)}
              className="w-full rounded-lg border p-3 text-slate-400"
            >
              {cursosDisponiveis.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>

          {erro && (
            <p role="alert" className="text-sm text-red-600">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
          >
            Adicionar formando
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Lista de formandos ({formandos.length})
          </h2>

          <div>
            <p className="mt-1 text-slate-500">
              Contagem por curso.
            </p>
            {cursosDisponiveis.map((opcao) => (
            <label key={opcao}  htmlFor="nome" className="mb-1 block text-sm font-medium text-black">
              {opcao} :: ({formandos.filter((formando) => formando.curso === opcao).length})
            </label> 
             ))}
          </div>

          <input
            value={pesquisa}
            onChange={(event) => setPesquisa(event.target.value)}
            placeholder="Pesquisar por nome..."
            aria-label="Pesquisar formandos por nome"
            className="mt-3 w-full rounded-lg border bg-white p-3 placeholder:text-slate-400"
          />
        </div>

        {formandosFiltrados.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-center text-slate-500">
            {formandos.length === 0
              ? "Ainda não existem formandos registados."
              : "Nenhum formando encontrado para essa pesquisa."}
          </p>
        ) : (
          <div className="space-y-3">
            {formandosFiltrados.map((formando) => (
              <article
                key={formando.id}
                className="rounded-xl border bg-white p-4"
              >
                <h3 className="font-semibold text-black">{formando.nome}</h3>
                <p className="text-sm text-slate-500">
                  Telefone: {formando.telefone}
                </p>
                <p className="text-sm text-slate-500">
                  Curso: {formando.curso}
                </p>
                <button onClick={() => excluirFormando(formando.id)} key={formando.id} className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800">
                  Excluir
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
