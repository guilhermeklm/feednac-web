import StudentWeeklySchedule from "../components/StudentWeeklySchedule"
import { useLocation, useParams } from "react-router-dom"
import './StudentHome.css'
import Button from 'react-bootstrap/Button';

export default function StudentHome() {
  const { id } = useParams();

  const { user } = useLocation().state

  return (
    <>
      <div className="container-student-home">
        <div className="barra-lateral-student">
          <div>
            <img className="image" alt="imagem-perfil" src="/imagem-perfil.jpg"></img>
            <div className="infos">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.dateOfBirth}</p>
              <p>Matricula {user.status === true ? "Ativa" : "Inativa"}</p>
              <p>{user.telephone}</p>
              <p>{user.course.name}</p>
              <p>{user.course.category}</p>
            </div>
          </div>
          <a href='/' className="botao-logoff"><Button variant="dark"> Logoff </Button></a>
        </div>
        <div className="container-cronograma">
          <h1>Meu Cronograma Semanal</h1>
          <StudentWeeklySchedule studentId={id} />
        </div>
      </div>
    </>
  );
}