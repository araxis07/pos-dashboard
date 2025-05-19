import { Card } from "@/components/common/Card";

interface StatItem {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export default function StatsSummary({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover-scale overflow-hidden"
          hoverable
        >
          <div className="flex items-start">
            {/* Icon */}
            {stat.icon && (
              <div className="mr-3 p-2 bg-gray-50 rounded-md">
                {stat.icon}
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1">
              <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              
              {/* Change indicator */}
              {stat.change && (
                <div className={`text-xs font-medium flex items-center
                  ${stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-500'}
                `}>
                  {stat.trend === 'up' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {stat.change}
                </div>
              )}
            </div>
            
            {/* Decoration */}
            <div 
              className={`absolute bottom-0 right-0 w-24 h-16 opacity-10 rounded-tl-full
                ${stat.trend === 'up' ? 'bg-green-600' : 
                  stat.trend === 'down' ? 'bg-red-600' : 
                  'bg-blue-600'}
              `}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
