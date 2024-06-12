import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClassEvaluation.css';

export default function ClassEvaluation() {
  const location = useLocation();
  const { studentId, courseSessionId } = location.state || {};
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/questions');
        console.log('Perguntas recebidas:', response.data.body.questions);
        setQuestions(response.data.body.questions);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log('ID do Aluno:', studentId);
    console.log('ID da Aula:', courseSessionId);
  }, [studentId, courseSessionId]);

  return (
    <div className="container">
      <h1>Avaliação da Aula</h1>

      <form >
        {questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.answer}</p>
            {question.options.map((option) => (
              <div key={option.id} className="option">
                <input
                  type="radio"
                  id={`question-${question.id}-option-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                />
                <label htmlFor={`question-${question.id}-option-${option.id}`}>
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  );
}
