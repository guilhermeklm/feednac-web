import './StudentLogin.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import axios from "axios";
import React from 'react';

function TeacherLogin() {
  const [Teacher, setTeacher] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    axios.get('http://localhost:8080/login/teacher/1')
      .then((response) => {
        setTeacher(response.data.body)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  console.log(Teacher)
  console.log(error)

  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <div className="professor-login-input">
        <InputGroup className='input-group'>
          <Form.Control
            placeholder="Matrícula do Professor"
            aria-label="Matrícula do professor"
          />
          <Form.Control
            type="password"
            placeholder="Senha"
            aria-label="Senha"
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
  );
  
}

export default TeacherLogin