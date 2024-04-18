import './TeacherLogin.css'
import Image from 'react-bootstrap/Image';
// import axios from "axios";
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function TeacherLogin() {
  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <Form method="POST" onSubmit={validarLogin} className='professor-login'>
        <Form.Group method as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Username
          </Form.Label>
          <Col sm="9">
            <Form.Control type="text" placeholder="Username" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="9">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Button variant="dark" type="submit"> Login </Button>
      </Form>
      <div className='img-bottom-right'>
        <Image src="senac_logo_new.png" />
      </div>
    </>
  );
}

function validarLogin() {
  // enviar para api o usuario e senhad\(base64)

  // const [Teacher, setTeacher] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // React.useEffect(() => {
  //   axios.get('http://localhost:8080/login/teacher/1')
  //     .then((response) => {
  //       setTeacher(response.data.body)
  //     })
  //     .catch(error => {
  //       setError(error)
  //     })
  // }, [])

  // console.log(Teacher)
  // console.log(error)

  console.log("valida login")
}

export default TeacherLogin