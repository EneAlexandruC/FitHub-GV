import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { RootState } from "../../app/store";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "./types";
import { fetchWorkouts } from "./workoutsSlice";

const WorkoutsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector((state: RootState) => state.workouts?.workouts ?? []);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Available Workouts</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workouts.map((workout: Workout, idx: number) => (
          <Col key={workout.id}>
            <WorkoutCard workout={{ ...workout, imageUrl: workout.imageUrl || `https://picsum.photos/seed/${workout.id || idx}/400/250` }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WorkoutsList;
