import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/exams').then(res => setExams(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Exams</h1>
      <div className="grid gap-4">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{exam.title}</h2>
              <p className="text-gray-600">{exam.description}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate(`/exam/${exam.id}`)}>
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
