import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ProgressCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

interface WorkoutProgress {
  date: string;
  completed: number;
  total: number;
  workoutName?: string;
}

interface WorkoutHistoryProps {
  onAddWorkout?: () => void;
  weeklyProgress?: WorkoutProgress[];
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ onAddWorkout, weeklyProgress = [] }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Weekly Workout Progress</Typography>
        <IconButton 
          color="primary" 
          onClick={onAddWorkout}
          sx={{ 
            backgroundColor: (theme) => theme.palette.primary.main + '20',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.main + '30',
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {weeklyProgress.map((progress, index) => (
          <ProgressCard key={index}>
            <StyledCardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(progress.date).toLocaleDateString()}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <FitnessCenterIcon color="primary" />
                <Typography variant="body2">
                  {progress.workoutName ? `${progress.workoutName}: ` : ''}{progress.completed}/{progress.total} workouts completed
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(progress.completed / progress.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </StyledCardContent>
          </ProgressCard>
        ))}
        {weeklyProgress.length === 0 && (
          <Typography variant="body2" color="textSecondary" align="center" py={4}>
            No workout history available. Start tracking your progress by adding a workout!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default WorkoutHistory; 