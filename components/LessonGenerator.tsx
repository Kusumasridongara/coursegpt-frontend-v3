'use client';

import { useState } from 'react';

export default function LessonGenerator() {
  const [topic, setTopic] = useState('');
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);

    // Mocked "AI-generated" lesson after 1 second
    setTimeout(() => {
      setLesson({
        title: `Introduction to ${topic}`,
        description: `This lesson covers the basics of ${topic}.`,
        outcomes: ['Understand key concepts', 'Apply basic techniques', 'Explain core ideas'],
        keyConcepts: ['Concept 1', 'Concept 2', 'Concept 3'],
        activity: `Do a hands-on project related to ${topic}.`,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Lesson Generator</h2>
      
      <input
        type="text"
        placeholder="Enter a topic (e.g., Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || topic.trim() === ''}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Lesson'}
      </button>

      {lesson && (
        <div className="mt-6 space-y-2 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold">{lesson.title}</h3>
          <p className="text-gray-700">{lesson.description}</p>
          <div>
            <strong>Learning Outcomes:</strong>
            <ul className="list-disc ml-6">
              {lesson.outcomes.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Key Concepts:</strong>
            <ul className="list-disc ml-6">
              {lesson.keyConcepts.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <p><strong>Activity:</strong> {lesson.activity}</p>
        </div>
      )}
    </div>
  );
}
