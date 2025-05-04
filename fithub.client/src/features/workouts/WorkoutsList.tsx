import React, { useEffect, useState } from "react"; 
import { Container, Row, Col, Form, Button, Offcanvas } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WorkoutCard from "./WorkoutCard";
import styles from "./WorkoutsList.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppDispatch } from "../../app/store";
import { fetchWorkouts } from "./workoutsSlice";

const WorkoutsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector((state: RootState) => state.workouts?.workouts ?? []);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredWorkouts(workouts);
  }, [workouts]);

  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [duration, setDuration] = useState<string[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  useEffect(() => { 
    document.body.classList.add(styles.workoutsPage);
    return () => {
      document.body.classList.remove(styles.workoutsPage);
    };
  }, []); // Add a class to the body when the component mounts

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search-results?searchInput=${searchInput}`);
  };


  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter logic based on the Workout interface
    const matchingWorkouts = workouts.filter((workout) => {
      const matchesEquipment = equipment.length === 0 || equipment.includes(workout.equipment);
      const matchesDifficulty = difficulty.length === 0 || difficulty.includes(workout.difficulty);
      const matchesDuration = duration.length === 0 || duration.includes(workout.duration);
    
      return matchesEquipment && matchesDifficulty && matchesDuration;
    });

    const nonMatchingWorkouts = workouts.filter(
      (workout) => !matchingWorkouts.includes(workout)
        );

    setFilteredWorkouts([...matchingWorkouts, ...nonMatchingWorkouts]);

    setShowFilter(false); // Close the filter sidebar after applying filters
  };

  const handleClearFilters = () => {
    // Reset all filters and show all workouts
    setEquipment([]);
    setDifficulty([]);
    setDuration([]);
    setFilteredWorkouts(workouts);

    setShowFilter(false); // Close the filter sidebar after clearing filters
  };

  useEffect(() => {
    setFilteredWorkouts(workouts); // Reset filtered workouts when the workouts list changes
  }, [workouts]);

  return (
      <Container className={styles.containerlist}>
         <h1 className="mb-4">Available Workouts</h1>

         <div className="d-flex justify-content-between aligh-items-center mb-4">
            
              {/* Filter Sidebar */}
          <Button variant="primary" onClick={() => setShowFilter(true)} className={`${styles.openFilter} mb-3`}>
            <i className="fas fa-filter" ></i>
            {" "} Filters
          </Button>

          <Offcanvas className={styles.offcanvas} show={showFilter} onHide={() => setShowFilter(false)} placement="start">
            <Offcanvas.Header>
              <Offcanvas.Title>Filter Workouts</Offcanvas.Title>
              <Button onClick={() => setShowFilter(false)} aria-label="Close" className={`${styles.closeButton} ms-auto`}>
                X
              </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form onSubmit={handleFilter}>
                {/* Equipment Filter */}
                <Form.Group controlId="equipmentFilter" className="mb-3">
                  <Form.Label>Equipment</Form.Label>
                  <div>
                    {["bodyweight", "dumbbells", "machines"].map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        value={option}
                        checked={equipment.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEquipment([...equipment, e.target.value]);
                          } else {
                            setEquipment(equipment.filter((item) => item !== e.target.value));
                          }
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>

                {/* Difficulty Filter */}
                <Form.Group controlId="difficultyFilter" className="mb-3">
                  <Form.Label>Difficulty</Form.Label>
                  <div>
                    {["beginner", "intermediate", "advanced"].map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        value={option}
                        checked={difficulty.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDifficulty([...difficulty, e.target.value]);
                          } else {
                            setDifficulty(difficulty.filter((item) => item !== e.target.value));
                          }
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>

                {/* Duration Filter */}
                <Form.Group controlId="durationFilter" className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <div>
                    {["short", "medium", "long"].map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                        value={option}
                        checked={duration.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDuration([...duration, e.target.value]);
                          } else {
                            setDuration(duration.filter((item) => item !== e.target.value));
                          }
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">
                  Apply Filters
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-3 ms-2"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>

          <Form className="position-relative mb-4" onSubmit={handleSearch} style={{ maxWidth: "40vh", width: "100%" }}>
              <Form.Control 
                className={`${styles.searchbar} pe-5`}
                type="text"
                placeholder="Search workouts... "
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
              <Button type="submit" className={styles.searchButton} variant="link" >
                <i className="fas fa-search" ></i>
              </Button>
              </Form>
        </div>


        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredWorkouts.map((workout) => (
            <Col key={workout.id}>
              <WorkoutCard workout={workout} />
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default WorkoutsList;