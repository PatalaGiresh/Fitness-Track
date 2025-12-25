import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../redux/actions/workoutActions';
import { getMeal } from '../redux/actions/dietActions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Progress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  const workouts = useSelector((state) => state.workouts.workoutList || []);
  const diets = useSelector((state) => state.meals.mealList || []);

  // Check if dark mode is active
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

  // ONLY change diet graph colors for dark mode
  const dietData = {
    labels: diets.map((meal) => new Date(meal.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories',
        data: diets.map((meal) => meal.calories || 0),
        borderColor: isDarkMode ? '#ff8a8a' : '#ff6b6b', // Pink - brighter for dark mode
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Proteins',
        data: diets.map((meal) => meal.proteins || 0),
        borderColor: isDarkMode ? '#4fd1c7' : '#2ec4b6', // Blue - brighter for dark mode
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Keep workout chart as is
  const workoutChartData = {
    labels: workouts.map(workout => new Date(workout.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Volume',
        data: workouts.map(workout => workout.volume || 0),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      {workouts.length > 0 ? (
        <Container className="mt-4">
          <h2 className="text-center">Your Fitness Progress</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <h3 className="text-center">Workout Progress</h3>
              <Line data={workoutChartData} />
            </Col>
            <Col md={6}>
              <h3 className="text-center">Diet Progress</h3>
              <Line data={dietData} />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Workouts Logged</Card.Title>
                  <Card.Text>{workouts.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total diets logged</Card.Title>
                  <Card.Text> {diets.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>No workouts / diets logged yet.</p>
      )}
    </div>
  )
}

export default Progress