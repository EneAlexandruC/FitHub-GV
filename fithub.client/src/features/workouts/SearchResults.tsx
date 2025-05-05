import React, {useEffect, useState} from "react";
import {Container, Button, Form} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import WorkoutsList from "./WorkoutsList";
import styles from "./WorkoutsList.module.css";

const SearchResults: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchTherm = new URLSearchParams(location.search).get("searchInput") || "";
    const workouts = useSelector((state: RootState) => state.workouts.workouts); // Fetch workouts from Redux store
    const [searchResults, setSearchResults] = useState(workouts); 

    const [searchInput, setSearchInput] = useState<string>(""); 

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`/search-results?searchInput=${searchInput}`);
    };

  
    useEffect(() => {
        document.body.classList.add(styles.workoutsPage);
        return () => {
          document.body.classList.remove(styles.workoutsPage);
        };
      }, []);

    useEffect(() => {
      // Filter workouts based on the search Therm
      const results = workouts.filter(
        (workout) =>
          workout.name.toLowerCase().includes(searchTherm.toLowerCase()) ||
          workout.description.toLowerCase().includes(searchTherm.toLowerCase())
      );
      setSearchResults(results);
    }, [searchTherm, workouts]);
  
    return (
      <Container className={styles.containerlist}>
        {/* <h1 className="mb-4">Search Results for "{searchTherm}"</h1> */}
        <div className="d-flex justify-content-between aligh-items-center mb-4">
          {/* <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
            Back
          </Button> */}
          
          {/* Search Bar */}
          {/* <Form className="position-relative mb-4" onSubmit={handleSearch} style={{ maxWidth: "40vh", width: "100%" }}>
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
          </Form> */}
        </div>
        {searchResults.length > 0 ? (
          <WorkoutsList searchResults={searchResults} />
        ) : (
          <div>
            <h3 style={{ color: "#C8C8D7" }}>There are no results for "{searchTherm}"</h3>
            <p style={{ color: "#C8C8D7" }}>Try searching again</p>
          </div>
        )}
      </Container>
    );
  };
  
  export default SearchResults;