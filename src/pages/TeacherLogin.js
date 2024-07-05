import './TeacherLogin.css';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';

export default class TeacherLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
  }

  async handleSubmit(e) {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    const url = `${process.env.REACT_APP_FEEDNAC_API}/login/teacher`;

    axios.post(url, {
      username: username,
      passwordEncrypted: btoa(password)
    })
      .then((response) => {
        const user = JSON.parse(JSON.stringify(response.data.body));
        this.setState({ user });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <>
        <div className="vazio"></div>
        <div className="container">
          <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
        </div>
        <Form method="POST" onSubmit={(e) => this.handleSubmit(e)} className="professor-login">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
          {this.state.error != null && <p className="error-message">{this.state.error.response.data.messages}</p>}
          <div className="button-container">
            <Button variant="dark" href="/">Voltar</Button>
            <Button variant="dark" type="submit">Login</Button>
          </div>
        </Form>
        {this.state.user && <Navigate to={`/teacher/${this.state.user.id}`} state={{ user: this.state.user }} />}
        <div className="img-bottom-right">
          <a href="/">
            <Image src="senac_logo_new.png" />
          </a>
        </div>
      </>
    );
  }
}
