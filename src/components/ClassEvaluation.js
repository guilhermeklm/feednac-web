import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ClassEvaluation.css';

export default function ClassEvaluation() {
  const location = useLocation();
  const state = location.state || {};
  // state.studentId e state.courseSessionId
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FEEDNAC_API}/questions`);
        setQuestions(response.data.body.questions);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="avaliação">
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
