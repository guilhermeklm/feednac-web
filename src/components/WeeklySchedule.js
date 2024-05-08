import React, { Component } from 'react';
import axios from 'axios';
import './WeeklySchedule.css'

export default class WeeklySchedule extends Component {

  constructor(props) {
    super(props)
    this.state = {
      studentId: props.studentId
    }
  }

  state = {
    studentId: null
  }

  async getCalendar() {
    const url = `${process.env.REACT_APP_FEEDNAC_API}/student/${this.state.studentId}/calendar`

    axios.get(url)
      .then(async (response) => {
        const calender = JSON.parse(JSON.stringify(response.data.body))
        this.setState({ calender })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <div>
        {this.props.calender != null ? (
          <table>
            <thead>
              <tr>
                <th>Dia da Semana</th>
                <th>Horário</th>
                <th>Sala</th>
                <th>Professor</th>
                <th>Matéria</th>
                <th>Turma</th>
                <th></th> {/* Coluna vazia para o botão */}
              </tr>
            </thead>
            <tbody>
              {this.props.calender.dailySchedules((item, index) => (
                <tr key={index}>
                  <td>{item.dayOfWeek}</td>
                  <td>{`${item.courseSession.startTime} - ${item.courseSession.endTime}`}</td>
                  <td>{item.courseSession.classRoom}</td>
                  <td>{item.courseSession.teacherName}</td>
                  <td>{item.courseSession.subjectName}</td>
                  <td>{item.courseSession.className}</td>
                  <td><button className="avaliar-btn">Avaliar Aula</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum cronograma disponível para esta semana.</p>
        )}
      </div>
    );
  }
}