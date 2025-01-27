import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { RootState, AppDispatch } from "../../app/store";
import { fetchWorkoutById, clearSelectedWorkout } from "./workoutsSlice";

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedWorkout: workout,
    loading,
    error,
  } = useSelector((state: RootState) => state.workouts);

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkoutById(id));
    }
    return () => {
      dispatch(clearSelectedWorkout()); // Clear selected workout when component unmounts
    };
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!workout) {
    return <div>No workout found</div>;
  }

  return (
    <Container className="py-5">
      <Button
        variant="link"
        className="mb-4 p-0"
        onClick={() => navigate("/workouts")}
      >
        <ArrowLeft className="me-2" />
        Back to Workouts
      </Button>

      <Row>
        <Col md={6}>
          <img
            src={workout.image}
            alt={workout.name}
            className="img-fluid rounded mb-4"
          />
        </Col>
        <Col md={6}>
          <h1>{workout.name}</h1>
          <div className="mb-4">
            <span className="badge bg-primary me-2">{workout.duration}</span>
            <span className="badge bg-secondary">{workout.type}</span>
            <span className="badge bg-info">{workout.difficulty}</span>
          </div>
          <p className="lead">{workout.description}</p>
          <p>Calories Burned: {workout.caloriesBurned}</p>
        </Col>
      </Row>

      <h2 className="mt-5 mb-4">Exercises</h2>
      <Row xs={1} md={2} className="g-4">
        {workout.exercises?.length > 0 ? (
          workout.exercises.map((exercise) => (
            <Col key={exercise.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{exercise.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Difficulty: {exercise.difficulty}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Category: {exercise.category}
                    </ListGroup.Item>
                    <ListGroup.Item>{exercise.description}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No exercises found for this workout.</p>
        )}
      </Row>
    </Container>
  );
};

export default WorkoutDetail;
