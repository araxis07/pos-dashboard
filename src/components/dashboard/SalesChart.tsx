import { ResponsiveBar } from "@nivo/bar";


export default function SalesChart({ data }: { data: any[] }) {
  return (
    <div style={{ height: 320 }}>
      <ResponsiveBar
        data={data}
        keys={["total"]}
        indexBy="date"
        margin={{ top: 10, right: 20, bottom: 40, left: 60 }}
        axisBottom={{ tickRotation: 40 }}
        axisLeft={{ legend: "ยอดขาย", legendPosition: "middle", legendOffset: -45 }}
        enableLabel={false}
      />
    </div>
  );
}
