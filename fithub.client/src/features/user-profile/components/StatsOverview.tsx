import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { UserStats } from '../types/UserStats';
import { useNavigate } from 'react-router-dom';

const StatRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StatCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  minWidth: 220,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  borderRadius: 16,
  background: '#fff',
  flex: 1,
}));

const StatContent = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 32,
  lineHeight: 1.1,
  color: theme.palette.primary.main,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.text.secondary,
  marginTop: 2,
}));

const StatSub = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.disabled,
  marginTop: 2,
}));

const StatsOverview: React.FC<{ stats: UserStats }> = ({ stats }) => {
  const navigate = useNavigate();

  // Robustly check for saved workouts in localStorage
  let hasSavedWorkouts = false;
  try {
    const workoutsStr = localStorage.getItem('workouts');
    if (workoutsStr) {
      const workouts = JSON.parse(workoutsStr);
      hasSavedWorkouts = Array.isArray(workouts) && workouts.length > 0;
    }
  } catch {
    hasSavedWorkouts = false;
  }

  return (
    <>
      <StatRow>
        <StatCard>
          <FitnessCenterIcon color="primary" sx={{ fontSize: 40 }} />
          <StatContent>
            <StatValue>{stats.totalWorkouts ?? 0}</StatValue>
            <StatLabel>Total Workouts</StatLabel>
          </StatContent>
        </StatCard>
        <StatCard>
          <WhatshotIcon sx={{ fontSize: 40, color: '#ff9800' }} />
          <StatContent>
            <StatValue>{stats.currentStreak ?? 0}</StatValue>
            <StatLabel>Active Days Streak</StatLabel>
            <StatSub>Record: {stats.bestStreak ?? 0} days</StatSub>
          </StatContent>
        </StatCard>
        <StatCard>
          <EmojiEventsIcon sx={{ fontSize: 40, color: '#FFD700' }} />
          <StatContent>
            <StatValue>{stats.completionRate ?? 0}%</StatValue>
            <StatLabel>Completion Rate</StatLabel>
          </StatContent>
        </StatCard>
        <StatCard>
          <TrendingUpIcon sx={{ fontSize: 40, color: '#43a047' }} />
          <StatContent>
            <StatValue>{stats.averageWorkoutsPerWeek ?? 0}</StatValue>
            <StatLabel>Avg/week</StatLabel>
            <StatSub>This month: {stats.totalWorkoutsThisMonth ?? 0}</StatSub>
          </StatContent>
        </StatCard>
      </StatRow>
      <Box mt={4}>
        <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            🏅 Congratulations! You have completed {stats.totalWorkouts ?? 0} workouts!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep your streak active and unlock new badges!
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {navigate('/workout-builder')}}
          >
            {hasSavedWorkouts ? 'Browse Personalised Workouts' : 'Create a new workout'}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default StatsOverview;
