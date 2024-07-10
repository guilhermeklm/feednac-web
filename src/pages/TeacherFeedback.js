import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherFeedback.css';
import { Chart } from "react-google-charts";
import ListGroup from 'react-bootstrap/ListGroup';

export default function TeacherFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const courseSessionName = state.courseSessionName
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
      newGeneralNotesAverage += feedback.generalNote;
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

  const handleBackButton = () => {
    navigate(-1);
  };

  const generatePieChartData = (questionData) => {
    const data = [["Answer", "Count"]];
    questionData.options.forEach(option => {
      data.push([option.answer, option.count]);
    });
    return data;
  };

  return (
    <div className="App">
      <h1>{courseSessionName}</h1>
      <ListGroup numbered>
        <h3>Comentarios: </h3>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <h3> Média de nota: {generalNotesAverage}</h3>
      <hr />
      {questionAnswerCounts.map((questionData, index) => (
        <div key={index}>
          <Chart
            chartType="PieChart"
            data={generatePieChartData(questionData)}
            options={{ title: questionData.question }}
            width={"100%"}
            height={"400px"}
          />
        </div>
      ))}
      <div className="return">
        <button type="button" onClick={handleBackButton} style={{ marginTop: '20px' }}>Voltar</button>
      </div>
    </div>
  );
}