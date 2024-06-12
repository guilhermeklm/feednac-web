import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeeklySchedule.css';
import { Link } from 'react-router-dom';

export default function StudentWeeklySchedule({ studentId }) {
  const [dailySchedules, setDailySchedules] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_FEEDNAC_API}/student/${studentId}/dailySchedules`;

    axios.get(url)
      .then(async (response) => {
        const dailySchedules = JSON.parse(JSON.stringify(response.data.body));
        setDailySchedules(dailySchedules);
      });
  }, [studentId]);

  return (
    <div>
      {dailySchedules.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
              <th>Matéria</th>
              <th>Professor</th>
              <th>Horário</th>
              <th>Sala</th>
              <th>Turma</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dailySchedules.map((item, index) => (
              <tr key={index}>
                <td>{item.dailySchedule.dayOfWeek}</td>
                <td>{item.dailySchedule.courseSession.subjectName}</td>
                <td>{item.dailySchedule.courseSession.teacherName}</td>
                <td>{item.dailySchedule.courseSession.startTime} - {item.dailySchedule.courseSession.endTime}</td>
                <td>{item.dailySchedule.courseSession.classRoom}</td>
                <td>{item.dailySchedule.courseSession.className}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/classEvaluation',
                      state: {
                        studentId: studentId,
                        courseSessionId: item.dailySchedule.courseSession.id
                      }
                    }}
                  >
                    <button className="avaliacao-btn">Avaliar Aula</button>
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
