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
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const workout = useSelector((state: RootState) => state.workouts.selectedWorkout);
  
  useEffect(() => { 
    document.body.classList.add(styles.workoutDetail);
    return () => {
      document.body.classList.remove(styles.workoutDetail);
    };
  }, []); // Add a class to the body

  useEffect(() => {
    if (id && workouts.length > 0) {
      dispatch(setSelectedWorkout(id));
    }
    return () => {
      dispatch(clearSelectedWorkout()); // Clear selected workout when component unmounts
    };
  }, [dispatch, id, workouts]);

  if (workouts.length > 0 && !workout) {
    return <div>Workout not found</div>;
  }
  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={`py-5 ${styles.background}`}>

      <Button 
        variant="link" 
        className="mb-4 p-0"
        onClick={() => navigate('/workouts')}
      >
        <ArrowLeft className="me-2" />
        Back to Workouts 
      </Button>

      <Row>

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img 
            src={/^https?:\/\//.test(workout.gif) ? workout.gif : (workout.gif.startsWith('/') ? workout.gif : `/workouts/${workout.gif}`)} 
            alt={workout.name}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '350px', width: '100%', objectFit: 'cover', background: '#fff' }}
            onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/workouts/placeholder.jpg'; }}
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className="mb-3">{workout.name}</h1>
          <div className="mb-3">
            <span className="badge bg-primary me-2">{workout.duration} mins</span>
            {workout.equipment.map((eq) => (
              <span key={eq} className="badge bg-secondary me-1">{eq.charAt(0).toUpperCase() + eq.slice(1)}</span>
            ))}
            <span className="badge bg-success ms-2">{workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}</span>
          </div>
          <div className="mb-2">
            <p className="lead">{workout.shortDescription}</p>
          </div>
        </Col>
      </Row>

      <h2 className="mt-5 mb-4">Exercises</h2>
      <Row xs={1} md={2} className="g-4">
        {(workout.exercises ?? []).map((exercise) => (
          <Col key={exercise.id}>
            <Card className={styles.card}>
              <Card.Body style={{ padding: '1rem 0.5rem' }}>
                {exercise.gif && (
                  <img 
                    src={/^https?:\/\//.test(exercise.gif) ? exercise.gif : (exercise.gif.startsWith('/') ? exercise.gif : `/exercise/${exercise.gif}`)} 
                    alt={exercise.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "240px", objectFit: "contain", background: "#fff", display: "block", marginLeft: "auto", marginRight: "auto" }}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/exercise/placeholder.gif'; }}
                  />
                )}
                <Card.Title>{exercise.name}</Card.Title>
                <ListGroup className={styles.list1}  variant="flush">
                  <ListGroup.Item className={styles.list} >Sets: {exercise.sets}</ListGroup.Item>
                  <ListGroup.Item className={styles.list} >Reps: {exercise.reps}</ListGroup.Item>
                  <ListGroup.Item className={styles.list} >
  {exercise.description.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      <br />
    </React.Fragment>
  ))}
</ListGroup.Item>
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