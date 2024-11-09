import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginData.email || !/\S+@\S+\.\S+/.test(loginData.email)) {
            setAlertMessage("Please enter a valid email address.");
            setShowAlert(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:5009/api/sample/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setAlertMessage(errorData.message || "Invalid login credentials.");
                setShowAlert(true);
                return;
            }

            const data = await response.json();
            console.log("Login successful with:", data);

            localStorage.setItem("userId", data.userId);
            console.log(data.role);
            
            if (data.role === "admin") {
                navigate("/students");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setAlertMessage("An error occurred. Please try again later.");
            setShowAlert(true);
        }
    };

    return (
        <Container fluid className="login-container">
            <Row className="align-items-center justify-content-center vh-100">
                <Col md={6} lg={4} className="form-container">
                    <h2 className="mb-4 text-center">Login</h2>

                    {showAlert && (
                        <Alert
                            variant="danger"
                            onClose={() => setShowAlert(false)}
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        <Button variant="warning" type="submit" className="">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
