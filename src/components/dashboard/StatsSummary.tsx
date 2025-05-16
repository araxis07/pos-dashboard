import { Card } from "@/components/common/Card";

export default function StatsSummary({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {stats.map(stat => (
        <Card key={stat.label} className="text-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-gray-500">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}
