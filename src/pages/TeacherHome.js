import TeacherWeeklySchedule from "../components/TeacherWeeklySchedule"
import { useLocation, useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function TeacherHome() {
  const { id } = useParams();

  // informacoes do professor
  const { user } = useLocation().state
  
  return (
    <div className="student-home">
    <div className="sidebar">
      <div className="profile">
        <img src={user.photoUrl} alt="Foto do Aluno" className="profile-img" />
        <div className="info">
          <h2>{user.name}</h2>
          <p>{user.id}</p>
        </div>
      </div>
      <div className="menu">
        <a href=".\">Voltar</a>
        <a href="\">Fazer Logoff</a>
      </div>
    </div>
    <div className="App">
      <h1>Meu Cronograma Semanal</h1>
      <TeacherWeeklySchedule teacherId={id} />
    </div>
    </div>
  );
}