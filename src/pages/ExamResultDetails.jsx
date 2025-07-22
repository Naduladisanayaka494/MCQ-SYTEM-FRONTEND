import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExamResultDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/results/${id}/answers`)
      .then(res => setData(res.data));
  }, [id]);

  
const handleDownload = () => {
  const input = document.getElementById('result-section');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('exam-result.pdf');
  });
};

 return (
  <>
    <div id="result-section">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Your Answers</h2>
        {data.map((item, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold">{index + 1}. {item.question}</p>
            <ul className="ml-4 mt-2">
              {item.options.map((opt, i) => (
                <li
                  key={i}
                  className={`py-1 px-2 rounded ${
                    i === item.correctOption ? 'bg-green-200' : ''
                  } ${
                    i === item.selectedOption && !item.isCorrect ? 'bg-red-200' : ''
                  }`}>
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="text-center mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleDownload}>
        Download PDF
      </button>
    </div>
  </>
);

}
