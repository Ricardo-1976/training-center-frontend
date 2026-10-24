import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Centros", href: "/centros" },
  { label: "Cursos", href: "/cursos" },
  { label: "Turmas", href: "/turmas" },
  { label: "Certificados", href: "certificados" },
  { label: "Formandos", href: "/formandos" },
  { label: "Professores", href: "/professores" },
  { label: "Financeiro", href: "/financeiro" },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="w-full border-b bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-blue-800"
        >
          Elite Gestão
        </Link>

        <nav className="mt-8 flex flex-wrap gap-2 md:flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 flex-1">

        <header className="border-b bg-white px-6 py-4">
          <p className="text-sm font-medium text-blue-700">
            Elite Gestão · Área Administrativa
          </p>

          <h1 className="mt-1 text-lg font-semibold text-slate-900">
            Painel de Gestão
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra os centros de formação e acompanha os resultados.
          </p>
        </header>

        {children}
      </section>
    </div>
  );
}