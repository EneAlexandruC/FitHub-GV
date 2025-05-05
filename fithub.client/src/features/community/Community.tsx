import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from '@mui/material';

const initialExercise = { name: '', sets: 3, reps: 10, description: '' };

const LOCAL_STORAGE_KEY = 'workouts';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

interface Workout {
  name: string;
  exercises: Exercise[];
}

const WorkoutBuilder: React.FC = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState(initialExercise);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [selectedWorkoutIdx, setSelectedWorkoutIdx] = useState<number | null>(null);

  const handleAddExercise = () => {
    if (exercise.name.trim() !== '') {
      setExercises([...exercises, exercise]);
      setExercise(initialExercise);
    }
  };

  // Load workouts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Workout[] = JSON.parse(stored);
        setSavedWorkouts(Array.isArray(parsed) ? parsed : []);
      } catch {
        setSavedWorkouts([]);
      }
    }
  }, []);

  // Save current workout to localStorage
  const handleSaveWorkout = () => {
    if (!workoutName.trim() || exercises.length === 0) return;
    const newWorkout: Workout = { name: workoutName, exercises };
    const updatedWorkouts = [...savedWorkouts, newWorkout];
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWorkouts));
    setWorkoutName('');
    setExercises([]);
    setExercise(initialExercise);
    setSelectedWorkoutIdx(null);
  };

  // Select a saved workout
  const handleSelectWorkout = (idx: number) => {
    setSelectedWorkoutIdx(idx);
    const workout = savedWorkouts[idx];
    setWorkoutName(workout.name);
    setExercises(workout.exercises);
  };

  // Delete a saved workout
  const handleDeleteWorkout = (idx: number) => {
    const updatedWorkouts = savedWorkouts.filter((_, i) => i !== idx);
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWorkouts));
    // If deleted workout is selected, clear selection
    if (selectedWorkoutIdx === idx) {
      setWorkoutName('');
      setExercises([]);
      setExercise(initialExercise);
      setSelectedWorkoutIdx(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create Workout</Typography>
      {/* Saved Workouts List */}
      {savedWorkouts.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Saved Workouts:</Typography>
          <ul style={{ paddingLeft: 16, marginTop: 0, marginBottom: 0 }}>
            {savedWorkouts.map((w, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                <Button size="small" color="secondary" onClick={() => handleSelectWorkout(idx)}>
                  {w.name}
                </Button>
                <Button size="small" color="error" onClick={() => handleDeleteWorkout(idx)} style={{ marginLeft: 8 }}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Workout Name"
          value={workoutName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkoutName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Divider sx={{ my: 2 }} />
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 1 }}
          onClick={handleSaveWorkout}
          disabled={!workoutName.trim() || exercises.length === 0 || selectedWorkoutIdx !== null}
        >
          {selectedWorkoutIdx !== null ? 'Cannot save an already saved workout' : 'Save Workout'}
        </Button>
        <Typography variant="h6" gutterBottom>Exercises</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="Exercise Name"
              value={exercise.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercise({ ...exercise, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Sets"
              type="number"
              value={exercise.sets}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercise({ ...exercise, sets: Number(e.target.value) })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              label="Reps"
              type="number"
              value={exercise.reps}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercise({ ...exercise, reps: Number(e.target.value) })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description"
              value={exercise.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercise({ ...exercise, description: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" color="primary" onClick={handleAddExercise} fullWidth>Add</Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>Workout Preview</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">{workoutName || 'Workout Name...'}</Typography>
          {exercises.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No exercises added.</Typography>
          ) : (
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 16 }}>
              {exercises.map((ex, idx) => (
                <li key={idx}>
                  {ex.name} ({ex.sets}x{ex.reps}){ex.description ? ` - ${ex.description}` : ''}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkoutBuilder;
