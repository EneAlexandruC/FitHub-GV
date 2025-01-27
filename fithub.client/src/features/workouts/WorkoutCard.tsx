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
        src={workout.image}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{workout.name}</Card.Title>
        <div className="mt-2">
          <span className="badge bg-primary me-2">{workout.duration}</span>
          <span className="badge bg-secondary">{workout.caloriesBurned}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WorkoutCard;
