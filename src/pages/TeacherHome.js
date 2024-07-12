import TeacherWeeklySchedule from "../components/TeacherWeeklySchedule"
import { useLocation, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import './TeacherHome.css'

export default function TeacherHome() {
  const { id } = useParams();

  // informacoes do professor
  const { user } = useLocation().state

  return (
    <>
      <div className="container-teacher-home">
        <div className="barra-lateral">
          <div>
            <img className="image" alt="imagem-perfil" src="/imagem-perfil.jpg"></img>
            <div className="infos">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.telephone}</p>
              {user.subjects.map((subject, index) => (
                <p>{subject}</p>
              ))}
            </div>
          </div>
          <a href='/' className="botao-logoff"><Button variant="dark"> Logoff </Button></a>
        </div>
        <div className="container-cronograma">
          <h1>Meu Cronograma Semanal</h1>
          <TeacherWeeklySchedule teacherId={id} />
        </div>
      </div>
    </>
  );
}