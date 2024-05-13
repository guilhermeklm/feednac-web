import TeacherWeeklySchedule from "../components/TeacherWeeklySchedule"
import { useLocation, useParams } from "react-router-dom"

export default function TeacherHome() {
  const { id } = useParams();

  // informacoes do professor
  const { user } = useLocation().state
  
  return (
    <div className="App">
      <h1>Meu Cronograma Semanal</h1>
      <TeacherWeeklySchedule teacherId={id} />
    </div>
  );
}