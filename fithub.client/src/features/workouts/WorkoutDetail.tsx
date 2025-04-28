import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import { RootState } from '../../app/store';
import { setSelectedWorkout, clearSelectedWorkout } from './workoutsSlice';
import styles from './WorkoutDetail.module.css';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workout = useSelector((state: RootState) => state.workouts.selectedWorkout);
  
  useEffect(() => { 
    document.body.classList.add(styles.workoutDetail);
    return () => {
      document.body.classList.remove(styles.workoutDetail);
    };
  }, []); // Add a class to the body

  useEffect(() => {
    if (id) {
      dispatch(setSelectedWorkout(id));
    }
    return () => {
        dispatch(clearSelectedWorkout()); // Clear selected workout when component unmounts
    };
  }, [dispatch, id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-5">

      <div className={styles.banner} />
      <Button 
        variant="link" 
        className="mb-4 p-0"
        onClick={() => navigate('/workouts')}
      >
        <ArrowLeft className="me-2" />
        Back to Workouts 
      </Button>

      <Row>

        <Col md={6}>
          <img 
            src={workout.imageUrl} 
            alt={workout.title}
            className="img-fluid rounded mb-4"
          />
        </Col>
        <Col md={6}>
          <h1>{workout.title}</h1>
          <div className="mb-4">
            <span className="badge bg-primary me-2">{workout.duration}</span>
            <span className="badge bg-secondary">{workout.equipment}</span>
          </div>
          <p className="lead">{workout.description}</p>
        </Col>
      </Row>

      <h2 className="mt-5 mb-4">Exercises</h2>
      <Row xs={1} md={2} className="g-4">
        {workout.exercises.map((exercise) => (
          <Col key={exercise.id}>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title>{exercise.name}</Card.Title>
                <ListGroup className={styles.list1}  variant="flush">
                  <ListGroup.Item className={styles.list} >Sets: {exercise.sets}</ListGroup.Item>
                  <ListGroup.Item className={styles.list} >Reps: {exercise.reps}</ListGroup.Item>
                  <ListGroup.Item className={styles.list} >{exercise.description}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default WorkoutDetail;