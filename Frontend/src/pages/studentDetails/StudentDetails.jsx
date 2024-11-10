import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import "./StudentDetails.css";
import Nav from "../../components/navbar/Nav";

function StudentDetails() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:5009/api/sample/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        const students = data.filter((user) => user.role !== "admin");
        console.log("Fetched students:", students);
        setUsers(students);
        setFilteredUsers(students);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        showToastMessage("Error fetching students.", "danger");
      });
  };

  const showToastMessage = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      (user.name?.toLowerCase() || "").includes(query) ||
      (user.email?.toLowerCase() || "").includes(query) ||
      (user.contactNumber?.toLowerCase() || "").includes(query) ||
      (user.address?.toLowerCase() || "").includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = (userId) => {
    console.log("Attempting to delete student with ID:", userId);
    fetch(`http://localhost:5009/api/sample/deleteUser/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        return response.json();
      })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        showToastMessage("Student deleted successfully.", "success");
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        showToastMessage("Error deleting student.", "danger");
      });
  };

  return (
    <>
      <Nav/>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="student-details-container my-5">
        <h2 className="text-center mb-4">Students List</h2>
        
        <Row className="mb-4 justify-content-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name, email, contact number, or address"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </Col>
        </Row>

        <Row>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const userId = user.id.someUniqueField || user.id;
              return (
                <Col key={userId} sm={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {user.email}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Contact Number:</strong> {user.contactNumber} <br />
                        <strong>Address:</strong> {user.address} <br />
                        <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()} <br />
                      </Card.Text>
                      <Button variant="danger" onClick={() => handleDelete(userId)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p className="text-center">No users found.</p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default StudentDetails;
