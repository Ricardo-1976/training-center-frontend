import FeatureCard from "@/components/FeatureCard";
import { title } from "process";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          Elite Gestão
        </p>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          A gestão do teu centro de formação,
          <span className="block text-blue-700">
            num só lugar.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Gere formandos, professores, turmas, pagamentos
          e resultados financeiros com uma única plataforma.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/login"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Entrar na plataforma
          </a>

          <a
            href="#funcionalidades"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Conhecer funcionalidades
          </a>
        </div>
      </section>

      <section
        id="funcionalidades"
        className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3"
      >
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Gestão académica
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Organiza cursos, turmas, professores e formandos.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Gestão financeira
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Acompanha receitas, despesas e pagamentos pendentes.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Vários centros
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Gere diferentes centros de formação numa plataforma.
          </p>
        </article>

        <FeatureCard title={"Certificados"} description={"Cria um quarto cartão chamado Certificados e adiciona uma descrição."} />
        
      </section>
    </main>
  );
}
