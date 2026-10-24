
import MetricCard from "@/components/dashboard/metric-card";

const metrics = [
    {
        id: "revenue",
        title: "Receita mensal",
        value: "1.250.000 Kz",
        description: "Total recebido no mês",
        trend: "Valor ilustrativo",
    },
    {
        id: "expenses",
        title: "Despesas",
        value: "350.000 Kz",
        description: "Despesas registadas",
    },
    {
        id: "profit",
        title: "Lucro esperado",
        value: "900.000 Kz",
        description: "Receita menos despesas",
    },
    {
        id: "pending",
        title: "Pagamentos pendentes",
        value: "125.000 Kz",
        description: "Valores por receber",
    },
    {
        id: "graduates",
        title: "Total de formandos",
        value: "210.000",
        description: "Formandos ativos",
    },
    

];

export default function DashboardPage() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard financeiro
        </h1>

        <p className="mt-2 text-slate-600">
          Acompanha o desempenho do teu centro de formação.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            trend={metric.trend}
          />
        ))}
      </section>
    </main>
  );
}
