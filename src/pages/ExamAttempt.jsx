import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/questions/exam/${id}`).then((res) => {
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
        selectedOption,
      })),
    };
    api.post("/results/submit", payload).then((res) => {
      alert(`You scored ${res.data.score} / ${res.data.total}`);
      navigate(`/result/${res.data.resultId}`);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600 animate-pulse">
          Loading questions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Exam Questions
        </h2>

        {questions.map((q, index) => (
          <div key={q.id} className="mb-8 border-b pb-4">
            <p className="font-semibold text-lg mb-3">
              {index + 1}. {q.questionText}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-indigo-700"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={i}
                    checked={answers[q.id] === i}
                    onChange={() => handleSelect(q.id, i)}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}
