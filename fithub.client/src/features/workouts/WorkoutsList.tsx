import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WorkoutCard from "./WorkoutCard";

const WorkoutsList: React.FC = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

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
