import React, { useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [exam, setExam] = useState({ title: '', description: '' });
  const [question, setQuestion] = useState({
    examId: '', questionText: '', options: ['', '', '', ''], correctOption: 0,
  });

  const createExam = async () => {
    await api.post('/exams', exam);
    alert('Exam created');
  };

  const addQuestion = async () => {
    await api.post('/questions', question);
    alert('Question added');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      <div className="mb-8">
        <h3 className="font-semibold">Create Exam</h3>
        <input type="text" placeholder="Title" className="input" onChange={(e) => setExam({ ...exam, title: e.target.value })} />
        <input type="text" placeholder="Description" className="input" onChange={(e) => setExam({ ...exam, description: e.target.value })} />
        <button className="btn-green" onClick={createExam}>Create</button>
      </div>

      <div>
        <h3 className="font-semibold">Add Question</h3>
        <input type="text" placeholder="Exam ID" className="input" onChange={(e) => setQuestion({ ...question, examId: e.target.value })} />
        <input type="text" placeholder="Question" className="input" onChange={(e) => setQuestion({ ...question, questionText: e.target.value })} />
        {question.options.map((opt, idx) => (
          <input key={idx} type="text" placeholder={`Option ${idx + 1}`} className="input"
            onChange={(e) => {
              const newOpts = [...question.options];
              newOpts[idx] = e.target.value;
              setQuestion({ ...question, options: newOpts });
            }} />
        ))}
        <input type="number" placeholder="Correct Option (0-3)" className="input" onChange={(e) => setQuestion({ ...question, correctOption: Number(e.target.value) })} />
        <button className="btn-blue" onClick={addQuestion}>Add Question</button>
      </div>
    </div>
  );
}
