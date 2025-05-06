'use client';

import { useState } from 'react';

type Lesson = {
  id: number;
  title: string;
  sections: string[]; // To hold generated sections for each lesson
};

type Module = {
  id: number;
  name: string;
  lessons: Lesson[];
};

export default function ModuleOrganizer() {
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleName, setModuleName] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const addModule = () => {
    if (moduleName.trim() === '') return;
    const newModule: Module = {
      id: Date.now(),
      name: moduleName,
      lessons: [],
    };
    setModules([...modules, newModule]);
    setModuleName('');
  };

  const addLessonToModule = () => {
    if (!selectedModuleId || lessonTitle.trim() === '') return;

    // Prompt user if they want to generate a fake lesson
    const generateFakeLesson = window.confirm(
      `Do you want to generate a lesson for "${lessonTitle}"?`
    );

    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: Date.now(),
                  title: lessonTitle,
                  sections: generateFakeLesson ? generateFakeLessonSections(lessonTitle) : [],
                },
              ],
            }
          : module
      )
    );

    setLessonTitle('');
  };

  // Function to generate fake lesson sections
  const generateFakeLessonSections = (lessonTitle: string) => {
    return [
      `${lessonTitle} - Introduction: This is the introduction to the lesson on ${lessonTitle}.`,
      `${lessonTitle} - Key Concepts: Here we cover the key concepts of ${lessonTitle}.`,
      `${lessonTitle} - Practical Applications: This section discusses the practical applications of ${lessonTitle}.`,
      `${lessonTitle} - Conclusion: A summary of the main takeaways from the lesson on ${lessonTitle}.`,
    ];
  };

  const deleteLesson = (moduleId: number, lessonId: number) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : module
      )
    );
  };

  const deleteModule = (id: number) => {
    setModules((prev) => prev.filter((module) => module.id !== id));
    if (selectedModuleId === id) setSelectedModuleId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">📚 Module Organizer</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New Module Name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addModule}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Module
        </button>
      </div>

      {modules.length > 0 && (
        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module.id} className="border p-4 rounded bg-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{module.name}</h3>
                <button
                  onClick={() => deleteModule(module.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete Module
                </button>
              </div>

              <ul className="list-disc ml-6 mb-2">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex justify-between items-center">
                    {lesson.title}
                    <button
                      onClick={() => deleteLesson(module.id, lesson.id)}
                      className="text-sm text-red-500 ml-2 hover:underline"
                    >
                      Delete
                    </button>

                    {/* Display the generated sections for each lesson */}
                    {lesson.sections.length > 0 && (
                      <ul className="ml-6 mt-2">
                        {lesson.sections.map((section, index) => (
                          <li key={index} className="text-gray-700">{section}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="New Lesson Title"
                  value={selectedModuleId === module.id ? lessonTitle : ''}
                  onChange={(e) => {
                    setSelectedModuleId(module.id);
                    setLessonTitle(e.target.value);
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={addLessonToModule}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
