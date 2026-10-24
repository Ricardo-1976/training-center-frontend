
type MetricCardProps = {
    title: string;
    value: string;
    description: string;
    trend?: string;
};

export default function MetricCard({
    title,
    value,
    description,
    trend,
}: MetricCardProps) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">
                {title}
            </h2>

            <p className="mt-4 text-2xl font-bold text-slate-900">
                {value}
            </p>

            <p className="mt-2 text-sm text-slate-500">
                {description}
            </p>
            {trend && (
                <p className="mt-3 text-sm font-medium text-blue-700">
                    {trend}
                </p>
            )}
        </article>
    );
}
