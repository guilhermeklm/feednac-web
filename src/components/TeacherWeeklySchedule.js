import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeeklySchedule.css'
import { Link } from 'react-router-dom';

export default function TeacherWeeklySchedule({ teacherId }) {

  const [dailySchedules, setDailySchedules] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_FEEDNAC_API}/teacher/${teacherId}/dailySchedules`

    axios.get(url)
      .then(async (response) => {
        const dailySchedules = JSON.parse(JSON.stringify(response.data.body))
        setDailySchedules(dailySchedules)
      })
  }, [teacherId])

  return (
    <div className='app'>
      {dailySchedules.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Matéria</th>
              <th>Horário</th>
              <th>Sala</th>
              <th>Turma</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dailySchedules.map((dailySchedule, index) => (
              <tr key={index}>
                <td>{dailySchedule.dayOfWeek}</td>
                <td>{dailySchedule.courseSession.subjectName}</td>
                <td>{dailySchedule.courseSession.startTime} - {dailySchedule.courseSession.endTime}</td>
                <td>{dailySchedule.courseSession.classRoom}</td>
                <td>{dailySchedule.courseSession.className}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/showFeedbacks',
                    }}
                    state={{
                      teacherId: teacherId,
                      courseSessionId: dailySchedule.courseSession.id,
                      courseSessionName: dailySchedule.courseSession.subjectName
                    }}
                  >
                    <button className="avaliacao-btn">Ver avaliações</button>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cronograma disponível</p>
      )}
    </div>
  );
}