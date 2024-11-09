import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Modal,
    Button,
    Form,
    Toast,
    ToastContainer,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import MaleA from "../../assets/boyA.jpg";
import FemaleA from "../../assets/girlA.jpg";
import { InfoCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/navbar/Nav";
import "./Dashboard.css";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const [userData, setUserData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:5009/api/sample/user/${userId}`)
                .then((response) => {
                    const fetchedData = response.data;
                    fetchedData.dob = new Date(fetchedData.dob)
                        .toISOString()
                        .split("T")[0];
                    setUserData(fetchedData);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    showNotification("Error fetching user details", "error");
                });
        }
    }, [userId]);

    const handleSave = () => {
        navigator("/home");
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "dob") {
            const age = calculateAge(value);
            setUserData((prevData) => ({
                ...prevData,
                dob: value,
                age: age,
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5009/api/sample/updateUser/${userId}`,
                userData
            );
            showNotification(response.data.message, "success");
            setShowEditModal(false);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message
                : "Error updating user";
            showNotification(errorMessage, "error");
        }
    };

    const handleShowModal = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);

    const showNotification = (msg, type) => {
        setMessage({ msg, type });
        setShowToast(true);
    };

    if (!userData) {
        return <p>Loading Student data...</p>;
    }

    return (
        <>
            <Nav />

            <div className="container mt-5">
                <h2 className="text-center mb-4">
                    Hi <span className="name-text">{userData.name}</span>!
                </h2>

                <div className="profile-container">
                    <div className="card shadow-box">
                        <div className="card-body">
                            <img
                                src={userData.gender === "Male" ? MaleA : FemaleA}
                                alt="avatar"
                            />
                            <div className="info-grid">
                                <p>
                                    <strong>Name:</strong> {userData.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userData.email}
                                </p>
                                <p>
                                    <strong>Contact Number:</strong> {userData.contactNumber}
                                </p>
                                <p>
                                    <strong>Address:</strong> {userData.address}
                                </p>
                                <p>
                                    <strong>Date of Birth:</strong> {userData.dob}
                                </p>
                                <p>
                                    <strong>Age:</strong> {userData.age}
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>Age is automatically calculated.</Tooltip>
                                        }
                                    >
                                        <Button className="info-btn">
                                            <InfoCircle style={{ color: "black" }} />
                                        </Button>
                                    </OverlayTrigger>
                                </p>
                                <p>
                                    <strong>Degree:</strong> {userData.degree}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {userData.gender}
                                </p>
                            </div>
                            <div className="button-container">
                                <Button variant="primary" onClick={handleShowModal}>
                                    Edit Details
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={showEditModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={userData.name || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={userData.email || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contactNumber"
                                    value={userData.contactNumber || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={userData.address || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={userData.dob || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={userData.age || ""}
                                    readOnly
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <ToastContainer position="top-end" className="p-3">
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                        bg={message.type === "success" ? "success" : "danger"}
                    >
                        <Toast.Body className="text-white">{message.msg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
            <Footer/>
        </>
    );
};

export default Dashboard;
