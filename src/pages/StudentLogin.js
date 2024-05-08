import './StudentLogin.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Navigate, Route } from "react-router-dom";
import StudentHome from './StudentHome';

export default class StudentLogin extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
  }

  state = {
    user: null,
    error: null
  }

  async handleSubmit(e) {
    e.preventDefault();
    const matricula = e.target[0].value

    const url = `${process.env.REACT_APP_FEEDNAC_API}/login/student/${matricula}`

    axios.get(url)
      .then(async (response) => {
        console.log(response)
        const user = JSON.parse(JSON.stringify(response.data.body))
        console.log(user)
        this.setState({ user })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <>
        <div className="vazio"></div>
        <div className="container">
          <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
        </div>
        <div className="student-login-input">
          <Form method="POST" onSubmit={(e) => this.handleSubmit(e)} className='professor-login'>
            <Form.Group as={Row} className="mb-3">
              <Form.Label id='matricula' column sm="3">
                Matrícula
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="Matricula" />
              </Col>
            </Form.Group>
            {this.state.error != null && <p className='error-message'> {this.state.error.response.data.messages} </p>}
            <Button variant="dark" type="submit"> Login </Button>
          </Form>
          {this.state.user &&
            <Route
              exact path={`/student/${this.state.user.id}`}
              component={StudentHome}
              render={() => <StudentHome user={this.state.user} />}
            />}
        </div>
        <div className='img-bottom-right'>
          <Image src="senac_logo_new.png" />
        </div>
      </>
    )
  }
}