import './StudentLogin.css'
// import axios from "axios";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StudentLogin() {
  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <div className="student-login-input">
      <Form method="POST" onSubmit={validarMatricula} className='professor-login'>
        <Form.Group method as={Row} className="mb-3" controlId="formPlaintext">
          <Form.Label column sm="3">
            Matrícula
          </Form.Label>
          <Col sm="9">
            <Form.Control type="text" placeholder="Username" />
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit"> Login </Button>
      </Form>
      </div>
      <div className='img-bottom-right'>
        <Image src="senac_logo_new.png" />
      </div>
    </>
  )
}

function validarMatricula() {
  // const [student, setStudent] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // React.useEffect(() => {
  //   axios.get('http://localhost:8080/login/student/1')
  //     .then((response) => {
  //       setStudent(response.data.body)
  //     })
  //     .catch(error => {
  //       setError(error)
  //     })
  // }, [])

  // console.log(student)
  // console.log(error)

  return null;
}

export default StudentLogin