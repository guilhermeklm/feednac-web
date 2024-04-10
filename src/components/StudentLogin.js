import './StudentLogin.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import axios from "axios";
import React from 'react';

function StudentLogin() {
  const [student, setStudent] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    axios.get('http://localhost:8080/login/student/1')
      .then((response) => {
        setStudent(response.data.body)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  console.log(student)
  console.log(error)

  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <div className="student-login-input">
        <InputGroup className='input-group'>
          <Form.Control
            placeholder="Matricula"
            aria-label="Matrícula do aluno"
          />
          <Button variant="outline-secondary" id="login">
            Logar
          </Button>
        </InputGroup>
      </div>
      <div className='img-bottom-right'>
        <Image src="senac_logo_new.png" />
      </div>
    </>
  )
}

export default StudentLogin