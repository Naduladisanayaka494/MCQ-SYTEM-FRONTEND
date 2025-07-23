import React, { useState } from "react";
import api from "../services/api";

export default function AdminPanel() {
  const [exam, setExam] = useState({ title: "", description: "" });
  const [question, setQuestion] = useState({
    examId: "",
    questionText: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  const createExam = async () => {
    await api.post("/exams", exam);
    alert("Exam created");
  };

  const addQuestion = async () => {
    await api.post("/questions", question);
    alert("Question added");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Admin Panel
        </h2>

        {/* Create Exam Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Create Exam
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setExam({ ...exam, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setExam({ ...exam, description: e.target.value })
              }
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={createExam}
          >
            Create Exam
          </button>
        </div>

        {/* Add Question Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            Add Question
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Exam ID"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setQuestion({ ...question, examId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Question"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {question.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  const newOpts = [...question.options];
                  newOpts[idx] = e.target.value;
                  setQuestion({ ...question, options: newOpts });
                }}
              />
            ))}
          </div>

          <input
            type="number"
            min={0}
            max={3}
            placeholder="Correct Option (0-3)"
            className="border rounded-lg p-3 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setQuestion({
                ...question,
                correctOption: Number(e.target.value),
              })
            }
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
