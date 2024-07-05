import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import './TeacherFeedback.css';

export default function TeacherFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const [questionAnswerCounts, setQuestionAnswerCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [generalNotesAverage, setGeneralNotesAverage] = useState(0);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FEEDNAC_API}/feedbacks?teacherId=${state.teacherId}&courseSessionId=${state.courseSessionId}`);
        setFeedbackList(response.data.body.feedbacks);
        console.log("Data fetched");
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbackData();
  }, [state.teacherId, state.courseSessionId]);

  useEffect(() => {
    const updatedQuestionAnswerCounts = [];
    const updatedComments = [];
    let newGeneralNotesAverage = 0;

    feedbackList.forEach(feedback => {
      updatedComments.push(feedback.additionalComment);
      newGeneralNotesAverage = newGeneralNotesAverage + feedback.generalNote
      feedback.answeredQuestions.forEach(answeredQuestion => {
        const { question: questionText, answer: answerText } = answeredQuestion;

        let questionData = updatedQuestionAnswerCounts.find(q => q.question === questionText);
        if (questionData) {
          const answerData = questionData.options.find(option => option.answer === answerText);
          if (answerData) {
            answerData.count += 1;
          } else {
            questionData.options.push({
              answer: answerText,
              count: 1
            });
          }
        } else {
          updatedQuestionAnswerCounts.push({
            question: questionText,
            options: [
              {
                answer: answerText,
                count: 1
              }
            ]
          });
        }
      });
    });

    setGeneralNotesAverage(newGeneralNotesAverage / feedbackList.length);
    setQuestionAnswerCounts(updatedQuestionAnswerCounts);
    setComments(updatedComments);

  }, [feedbackList]);

  const pieChartData = questionAnswerCounts.map((questionData, index) => ({
    id: index,
    data: questionData.options.map((option, optionIndex) => ({
      id: optionIndex,
      value: option.count,
      label: option.answer,
    })),
  }));

  const handleBackButton = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <div className="App">
      <h1>Feedbacks</h1>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <p>Média de nota: {generalNotesAverage} </p>
      <div style={{ display: 'grid', gridTemplateColumns: '900px 800px', gap: '10px' }}>
        {pieChartData.map((chartData, index) => (
          <PieChart
            key={index}
            series={[
              {
                data: chartData.data,
                cx: 130,
                arcLabel: "value",
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -10, color: 'gray' },
              },
            ]}
            width={900}
            height={230}
          />
        ))}
      </div>
      <div className="return">
        <button type="button" onClick={handleBackButton} style={{ marginTop: '20px' }}>Voltar</button>
      </div>
    </div>
  );
}

