import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Landing.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container fluid className="landing-container">
      <Row className="align-items-center justify-content-center landing-content">
        <Col md={6} className="text-container">
          <h1>Welcome to E-Learning</h1>
          <p>"The future depends on what you do today"</p>
          <div className="button-section">
            <Button variant="warning" className="btn-get-started" onClick={handleRedirect}>
              Get Started
            </Button>
            <Button  variant="outline-warning" className="btn-login" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
