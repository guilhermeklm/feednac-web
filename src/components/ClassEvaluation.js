import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClassEvaluation.css';

export default function ClassEvaluation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId, courseSessionId } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [generalNote, setGeneralNote] = useState('');
  const [additionalComment, setAdditionalComment] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FEEDNAC_API}/questions`);
        console.log('Perguntas recebidas:', response.data.body.questions);
        setQuestions(response.data.body.questions);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const questionsAnswered = Object.keys(answers).map((questionId) => ({
      questionId: parseInt(questionId),
      optionId: answers[questionId],
    }));

    const feedbackData = {
      studentId,
      courseSessionId,
      generalNote: parseInt(generalNote),
      additionalComment,
      questionsAnswered,
    };

    try {
      const feedbackUrl = `${process.env.REACT_APP_FEEDNAC_API}/feedbacks`
        
      await axios.post(feedbackUrl, feedbackData);
      navigate(`/student/${studentId}`, { state: { studentId } });
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleBackButton = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <div className="evaluation">
      <h1>Avaliação da Aula</h1>

      <form onSubmit={handleSubmit}>
        <div className="questions-container">
          {questions.map((question) => (
            <div className="question" key={question.id}>
              <p>{question.answer}</p>
              <div className="options">
                {question.options.map((option) => (
                  <div className="option" key={option.id}>
                    <input
                      type="radio"
                      id={`question-${question.id}-option-${option.id}`}
                      name={`question-${question.id}`}
                      value={option.id}
                      onChange={() => handleOptionChange(question.id, option.id)}
                    />
                    <label htmlFor={`question-${question.id}-option-${option.id}`}>
                      {option.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="additional-info">
          <label htmlFor="generalNote">Nota Geral (0 - 10):</label>
          <input
            type="number"
            id="generalNote"
            value={generalNote}
            min="0"
            max="10"
            onChange={(e) => setGeneralNote(e.target.value)}
            required
          />
          <label htmlFor="additionalComment">Comentário Adicional:</label>
          <textarea
            id="additionalComment"
            value={additionalComment}
            onChange={(e) => setAdditionalComment(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="submit">
          <button type="submit">Enviar Avaliação</button><></>
        </div>
        <div className="return"><button type="return" onClick={handleBackButton}>Voltar</button></div>
      </form>
    </div>
  );
}
