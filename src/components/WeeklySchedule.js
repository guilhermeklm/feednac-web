import React, { Component, useEffect, useState } from 'react';
import './WeeklySchedule.css'


export class WeeklySchedule extends Component {

    constructor() {
        this.state = {
            studentId: null,
            calender: null,
            error: null
        }
    }


    async getCalender() {

    }

    render() {
        const url = `${process.env.REACT_APP_FEEDNAC_API}/student/${this.state.studentId}/calender`

        axios.get(url)
            .then(async (response) => {
                console.log(response)
                const calender = JSON.parse(JSON.stringify(response.data.body))
                this.setState({ calender })
            })
            .catch(error => {
                this.setState({ error })
            })
        return (
            <div>
                {this.state.calender != null ? (
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
                            {this.state.calender.dailySchedules((item, index) => (
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


const WeeklySchedule = ({ apiResponse }) => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        if (apiResponse && apiResponse.body && apiResponse.body.dailySchedules) {
            setSchedule(apiResponse.body.dailySchedules);
        }
    }, [apiResponse]);


};

export default WeeklySchedule;
