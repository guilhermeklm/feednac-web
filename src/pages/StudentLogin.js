import './StudentLogin.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Navigate } from 'react-router-dom';

export default class StudentLogin extends Component {
  state = {
    user: null,
    error: null,
    navigateBack: false,
  };

  async handleSubmit(e) {
    e.preventDefault();
    const matricula = e.target[0].value;
    const url = `${process.env.REACT_APP_FEEDNAC_API}/login/student/${matricula}`;

    axios.get(url)
      .then(async (response) => {
        const user = JSON.parse(JSON.stringify(response.data.body));
        this.setState({ user });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleBackButton = () => {
    this.setState({ navigateBack: true });
  };

  render() {
    if (this.state.navigateBack) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <div className="vazio"></div>
        <div className="container">
          <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
        </div>
        <div className="student-login-input">
          <Form method="POST" onSubmit={(e) => this.handleSubmit(e)} className="professor-login">
            <Form.Group as={Row} className="mb-3">
              <Form.Label id="matricula" column sm="3">
                Matrícula
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" placeholder="Matricula" />
              </Col>
            </Form.Group>
            {this.state.error != null && <p className="error-message">{this.state.error.response.data.messages}</p>}

            <div className="button-container">
              <Button variant="dark" onClick={this.handleBackButton}>Voltar</Button>
              <Button variant="dark" type="submit">Login</Button>
              
            </div>
          </Form>
          {this.state.user && <Navigate to={`/student/${this.state.user.id}`} state={{ user: this.state.user }} />}
        </div>
        <div className="img-bottom-right">
          <a href="/">
            <Image src="senac_logo_new.png" />
          </a>
        </div>
      </>
    );
  }
}
