import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import WorkoutCard from "./WorkoutCard";
import { fetchWorkouts } from "./workoutsSlice";

const WorkoutsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workouts, loading, error } = useSelector(
    (state: RootState) => state.workouts
  );

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container className="py-5">
      <h1 className="mb-4">Available Workouts</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workouts.map((workout) => (
          <Col key={workout.id}>
            <WorkoutCard workout={workout} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WorkoutsList;
