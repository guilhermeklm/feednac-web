import React from 'react';
import StudentWeeklySchedule from "../components/StudentWeeklySchedule";
import { useLocation, useParams } from "react-router-dom";
import './StudentHome.css';
import Button from 'react-bootstrap/Button';

export default function StudentHome() {
  const { id } = useParams();
  
  // Informações do aluno
  const { user } = useLocation().state;
  
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
      <div className="content">
        <div className="App">
          <h1>Meu Cronograma Semanal</h1>
          <StudentWeeklySchedule studentId={id} />
        </div>
      </div>
    </div>
  );
}
