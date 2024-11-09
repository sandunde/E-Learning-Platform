import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Nav from "../../components/navbar/Nav"
import Algo from "../../assets/algo.webp";
import CVision from "../../assets/cVision.webp";
import DEngineering from "../../assets/dEngineering.webp";
import Math from "../../assets/maths.webp";
import Nlp from "../../assets/nlp.webp";
import Oop from "../../assets/oop.webp";
import Python from "../../assets/python.webp";
import Sepp from "../../assets/sepp.webp";
import Rtrends from "../../assets/rTrends.webp";



import "./Home.css";
import Footer from '../../components/footer/Footer';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <div className='module-container'>
        <Row className="g-5">
          <Col>
            <div className='module'>
              <img src={Algo} alt='algorithm' />
              <div className='module-text'>
                <h4>Algorithms</h4>
                <p>Module Code: SE2039</p>
                <p>Duration: Semester Long</p>
                <p>Module Leader: Mr. N.Senanayaka</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={CVision} alt='algorithm' />
              <div className='module-text'>
                <h4>Computer Vision</h4>
                <p>Module Code: SE2233</p>
                <p>Duration: Semester Long</p>
                <p>Module Leader: Mr. N.Kodikara</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={DEngineering} alt='algorithm' />
              <div className='module-text'>
                <h4>Data Engineering</h4>
                <p>Module Code: SE2112</p>
                <p>Duration: Year Long</p>
                <p>Module Leader: Mrs. V.Embuldaniya</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-5">
          <Col>
            <div className='module'>
              <img src={Math} alt='algorithm' />
              <div className='module-text'>
                <h4>Mathematics</h4>
                <p>Module Code: SE2679</p>
                <p>Duration: Semester Long</p>
                <p>Module Leader: Mr. S.Gayashi</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={Nlp} alt='algorithm' />
              <div className='module-text'>
                <h4>NLP</h4>
                <p>Module Code: SE2348</p>
                <p>Duration: Year Long</p>
                <p>Module Leader: Mr. J.Ruwan</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={Oop} alt='algorithm' />
              <div className='module-text'>
                <h4>OOP</h4>
                <p>Module Code: SE2761</p>
                <p>Duration: Semester Long</p>
                <p>Module Leader: Mr. G.Sevenasan</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-5">
          <Col>
            <div className='module'>
              <img src={Python} alt='algorithm' />
              <div className='module-text'>
                <h4>Python</h4>
                <p>Module Code: SE2445</p>
                <p>Duration: Year Long</p>
                <p>Module Leader: Mr. K.Thubowita</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={Sepp} alt='algorithm' />
              <div className='module-text'>
                <h4>SEPP</h4>
                <p>Module Code: SE2888</p>
                <p>Duration: Semester Long</p>
                <p>Module Leader: Mr. S.D.Silva</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className='module'>
              <img src={Rtrends} alt='algorithm' />
              <div className='module-text'>
                <h4>Research Trends</h4>
                <p>Module Code: SE2039</p>
                <p>Duration: Year Long</p>
                <p>Module Leader: Mr. N.Senanayaka</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default Home