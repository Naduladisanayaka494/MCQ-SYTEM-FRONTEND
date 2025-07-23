import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Available Exams
        </h1>

        {exams.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No exams available.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {exam.title}
                  </h2>
                  <p className="text-gray-600">{exam.description}</p>
                </div>
                <div className="mt-6">
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    onClick={() => navigate(`/exam/${exam.id}`)}
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
