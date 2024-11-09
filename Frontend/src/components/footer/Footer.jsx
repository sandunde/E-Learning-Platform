import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Moodle.LK</h5>
                        <p>
                            We are committed to delivering the best service and products to our customers.
                            Connect with us to know more!
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/services" className="text-white">Key Links</a></li>
                            <li><a href="/faq" className="text-white">FAQ</a></li>
                            <li><a href="/results" className="text-white">Results</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <div className="d-flex">
                            <a href="https://facebook.com" className="text-white me-3">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com" className="text-white me-3">
                                <Twitter size={24} />
                            </a>
                            <a href="https://instagram.com" className="text-white me-3">
                                <Instagram size={24} />
                            </a>
                            <a href="https://linkedin.com" className="text-white">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p>&copy; 2024 Moodle.LK. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
