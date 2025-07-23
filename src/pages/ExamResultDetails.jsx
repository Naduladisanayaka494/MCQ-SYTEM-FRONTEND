import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExamResultDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/results/${id}/answers`).then((res) => setData(res.data));
  }, [id]);

  const handleDownload = () => {
    const input = document.getElementById("result-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("exam-result.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div
        id="result-section"
        className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Your Answers
        </h2>

        {data.length === 0 ? (
          <p className="text-center text-gray-500">No answers found.</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="mb-8">
              <p className="font-semibold text-lg mb-2">
                {index + 1}. {item.question}
              </p>
              <ul className="space-y-2">
                {item.options.map((opt, i) => {
                  const isCorrect = i === item.correctOption;
                  const isSelected = i === item.selectedOption;
                  const isWrongSelection = isSelected && !item.isCorrect;

                  return (
                    <li
                      key={i}
                      className={`px-4 py-2 rounded-md border 
                        ${isCorrect ? "bg-green-100 border-green-300" : ""}
                        ${
                          isWrongSelection
                            ? "bg-red-100 border-red-300"
                            : "border-gray-200"
                        }
                        ${isSelected ? "font-medium" : ""}`}
                    >
                      {opt}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}
