import { ResponsiveBar } from "@nivo/bar";

interface SalesChartProps {
  data: Array<{
    date: string;
    total: number;
    [key: string]: any;
  }>;
  showValues?: boolean;
  animate?: boolean;
  colors?: string | string[];
}

export default function SalesChart({ 
  data, 
  showValues = false,
  animate = true,
  colors = "rgb(59, 130, 246)"
}: SalesChartProps) {
  // Format data for tooltip
  const formatValue = (value: number) => {
    return value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
  };
  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveBar
        data={data}
        keys={["total"]}
        indexBy="date"
        margin={{ top: 20, right: 30, bottom: 50, left: 80 }}
        padding={0.3}
        colors={colors}
        enableLabel={showValues}
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor="#ffffff"
        animate={animate}
        motionStiffness={90}
        motionDamping={15}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: "วันที่",
          legendPosition: "middle",
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "ยอดขาย (บาท)",
          legendPosition: "middle",
          legendOffset: -60,
          format: value => 
            value >= 1000 
              ? `${Math.floor(value / 1000)}k` 
              : value
        }}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: 10,
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              color: 'black',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
            }}
          >
            <strong>{formatValue(value)}</strong>
          </div>
        )}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 11,
                fill: "#6b7280"
              }
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#4b5563",
                fontWeight: 600
              }
            }
          },
          grid: {
            line: {
              stroke: "#e5e7eb",
              strokeWidth: 1
            }
          }
        }}
        borderRadius={4}
        borderColor="white"
        gridYValues={5}
        enableGridX={false}
        enableGridY={true}
      />
    </div>
  );
}
