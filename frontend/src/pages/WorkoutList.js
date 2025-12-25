import React, { useState } from "react";
import { Container, Table, Button, Form, Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addWorkout } from "../redux/actions/workoutActions";
import { FaDumbbell, FaListOl, FaSortNumericUp, FaSyncAlt, FaPlus, FaMinus } from "react-icons/fa";
import "./Workouts.css";

function Workouts() {
  const dispatch = useDispatch();

  // Each workout row is an object with 'exercise', 'sets', 'reps', and 'weight'
  const [workouts, setWorkouts] = useState([{ exercise: "", sets: "", reps: "", weight: "" }]);
  const [errors, setErrors] = useState([]); // Validation errors - array of error objects

  // Validate each workout
  const validateWorkout = (workout) => {
    const newErrors = {};
    if (!workout.exercise) newErrors.exercise = "Exercise name is required";
    if (!workout.sets) newErrors.sets = "Number of sets is required";
    if (!workout.reps) newErrors.reps = "Number of reps is required";
    if (!workout.weight) newErrors.weight = "Weight is required";
    return newErrors;
  };

  // Handle field changes for individual workout rows
  const handleWorkoutChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][name] = value;
    setWorkouts(updatedWorkouts);
    
    // Clear error for this field when user starts typing
    if (errors[index] && errors[index][name]) {
      const updatedErrors = [...errors];
      delete updatedErrors[index][name];
      setErrors(updatedErrors);
    }
  };

  // Add new workout to the store and reset the form
  const handleAddWorkout = () => {
    let hasErrors = false;
    const newErrorsArray = [];
    
    // Validate each workout
    workouts.forEach((workout) => {
      const validationErrors = validateWorkout(workout);
      newErrorsArray.push(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrorsArray);
      return;
    }

    // Dispatch each workout to the Redux store
    workouts.forEach((workout) => {
      dispatch(addWorkout(workout));
    });

    // Reset the form with one empty row
    setWorkouts([{ exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors([]);
  };

  // Add an empty row to the workout table
  const handleAddRow = () => {
    setWorkouts([...workouts, { exercise: "", sets: "", reps: "", weight: "" }]);
    setErrors([...errors, {}]);
  };

  // Remove a workout row
  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
    
    const updatedErrors = errors.filter((_, i) => i !== index);
    setErrors(updatedErrors);
  };

  // Summarize workouts
  const totalSets = workouts.reduce((total, workout) => total + Number(workout.sets || 0), 0);
  const totalReps = workouts.reduce((total, workout) => total + Number(workout.reps || 0), 0);
  const totalWeightLifted = workouts.reduce((total, workout) => total + Number(workout.weight || 0), 0);

  // Check if there are any errors to display
  const hasErrors = errors.some(error => error && Object.keys(error).length > 0);

  return (
    <Container className="workouts-page">
      <h2 className="text-center mb-4">Workout List</h2>

      <Table bordered hover className="workout-table">
        <thead className="table-header">
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight (kg)</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index} className={errors[index] && Object.keys(errors[index]).length > 0 ? "table-row-error" : ""}>
              <td>
                <Form.Group controlId={`exercise-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Bench Press"
                    name="exercise"
                    value={workout.exercise}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    isInvalid={errors[index] && !!errors[index].exercise}
                    className="workout-input"
                  />
                  {errors[index] && errors[index].exercise && (
                    <div className="error-message">
                      {errors[index].exercise}
                    </div>
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId={`sets-${index}`}>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="0"
                    name="sets"
                    value={workout.sets}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    isInvalid={errors[index] && !!errors[index].sets}
                    className="workout-input"
                  />
                  {errors[index] && errors[index].sets && (
                    <div className="error-message">
                      {errors[index].sets}
                    </div>
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId={`reps-${index}`}>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="0"
                    name="reps"
                    value={workout.reps}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    isInvalid={errors[index] && !!errors[index].reps}
                    className="workout-input"
                  />
                  {errors[index] && errors[index].reps && (
                    <div className="error-message">
                      {errors[index].reps}
                    </div>
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId={`weight-${index}`}>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="0"
                    name="weight"
                    value={workout.weight}
                    onChange={(event) => handleWorkoutChange(index, event)}
                    isInvalid={errors[index] && !!errors[index].weight}
                    className="workout-input"
                  />
                  {errors[index] && errors[index].weight && (
                    <div className="error-message">
                      {errors[index].weight}
                    </div>
                  )}
                </Form.Group>
              </td>
              <td className="text-center">
                <div className="action-buttons">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Add a new workout row</Tooltip>}>
                    <Button 
                      variant="outline-primary" 
                      onClick={handleAddRow}
                      className="action-btn"
                    >
                      <FaPlus />
                    </Button>
                  </OverlayTrigger>

                  {workouts.length > 1 && (
                    <OverlayTrigger placement="top" overlay={<Tooltip>Remove this workout row</Tooltip>}>
                      <Button 
                        variant="outline-danger" 
                        onClick={() => handleRemoveWorkout(index)}
                        className="action-btn ms-2"
                      >
                        <FaMinus />
                      </Button>
                    </OverlayTrigger>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Error summary - only show if there are errors */}
      {hasErrors && (
        <div className="error-summary">
          <p className="error-summary-text">
            <strong>Please fill out all required fields in the table above.</strong>
          </p>
        </div>
      )}

      <Row className="justify-content-center mb-4">
        <Col md={6} className="text-center">
          <Button 
            variant="success" 
            onClick={handleAddWorkout}
            size="lg"
            className="submit-btn"
          >
            Save Workout Session
          </Button>
        </Col>
      </Row>

      {/* Workout Summary */}
      <div className="workout-summary">
        <h4 className="text-center mb-4">Workout Summary</h4>
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <Card className="text-center summary-card">
              <Card.Body>
                <FaListOl size={40} className="mb-3 summary-icon exercises" />
                <Card.Title>Total Exercises</Card.Title>
                <Card.Text className="summary-value">{workouts.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="text-center summary-card">
              <Card.Body>
                <FaSortNumericUp size={40} className="mb-3 summary-icon sets" />
                <Card.Title>Total Sets</Card.Title>
                <Card.Text className="summary-value">{totalSets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="text-center summary-card">
              <Card.Body>
                <FaSyncAlt size={40} className="mb-3 summary-icon reps" />
                <Card.Title>Total Reps</Card.Title>
                <Card.Text className="summary-value">{totalReps}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="text-center summary-card">
              <Card.Body>
                <FaDumbbell size={40} className="mb-3 summary-icon weight" />
                <Card.Title>Total Weight (kg)</Card.Title>
                <Card.Text className="summary-value">{totalWeightLifted}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Workouts;