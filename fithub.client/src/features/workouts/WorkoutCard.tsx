import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Workout } from "./types";
import styles from "./WorkoutCard.module.css";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={styles.workoutCard}
      onClick={() => navigate(`/workouts/${workout.id}`)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={/^https?:\/\//.test(workout.gif) ? workout.gif : (workout.gif.startsWith('/') ? workout.gif : `/workouts/${workout.gif}`)}
        style={{ height: "200px", objectFit: "cover" }}
        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/workouts/placeholder.jpg'; }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{workout.name}</Card.Title>
        <div className="mt-2">
          <span className="badge bg-primary me-2">{workout.duration} mins</span>
          {workout.equipment.map((eq) => (
            <span key={eq} className="badge bg-secondary me-1">{eq.charAt(0).toUpperCase() + eq.slice(1)}</span>
          ))}
          <span className="badge bg-success ms-2">{workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WorkoutCard;
