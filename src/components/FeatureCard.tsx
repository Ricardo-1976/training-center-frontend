type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="rounded-xl border bg-white p-6">
      <h2 className="font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 text-sm text-slate-600">
        {description}
      </p>
    </article>
  );
}