// src/components/charts/PieChartWidget.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DEFAULT_COLORS } from '../../utils/colors';

interface PieChartWidgetProps {
  title?: string
  data: { name: string; value: number }[]
  colors?: string[]
}


export const PieChartWidget = ({ title, data, colors = DEFAULT_COLORS }: PieChartWidgetProps) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      {title && <h3 style={{ textAlign: 'center' }}>{title}</h3>}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
