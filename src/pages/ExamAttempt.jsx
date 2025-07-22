import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/questions/exam/${id}`)
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      });
  }, [id]);

  const handleSelect = (qId, optionIndex) => {
    setAnswers({ ...answers, [qId]: optionIndex });
  };

  const handleSubmit = () => {
    const payload = {
      examId: parseInt(id),
      answers: Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption
      }))
    };
    api.post('/results/submit', payload).then(res => {
      alert(`You scored ${res.data.score} / ${res.data.total}`);
      navigate(`/result/${res.data.resultId}`);

    });
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Exam Questions</h2>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium">{index + 1}. {q.questionText}</p>
          <div className="mt-2">
            {q.options.map((opt, i) => (
              <label key={i} className="block mt-1">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={i}
                  checked={answers[q.id] === i}
                  onChange={() => handleSelect(q.id, i)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Submit Exam
      </button>
    </div>
  );
}
