import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// WorkoutProgress interface defined locally to avoid import issues
interface WorkoutProgress {
  date: string;
  completed: number;
  total: number;
  workoutName?: string;
}


interface ProgressChartProps {
  progress: WorkoutProgress[];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  // Sort and map progress for chart
  const chartData = [...progress]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: formatDate(item.date),
      completed: item.completed,
      total: item.total,
    }));

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Evoluția Antrenamentelor (ultimele sesiuni)
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="completed" stroke="#1976d2" strokeWidth={2} name="Finalizate" />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} name="Planificate" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ProgressChart;
