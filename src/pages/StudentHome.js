import StudentWeeklySchedule from "../components/StudentWeeklySchedule"
import { useLocation, useParams } from "react-router-dom"
import './StudentHome.css'
import Button from 'react-bootstrap/Button';

export default function StudentHome() {
  const { id } = useParams();
  
  // informacoes do aluno
  const { user } = useLocation().state
  
  return (
    <div className="App">
      <h1>Meu Cronograma Semanal</h1>
      <StudentWeeklySchedule studentId={id} />
      
      <a href='/'><Button variant="dark"> Logoff </Button></a>
    </div>
  );
}