'use client';

import { useState } from 'react';

type Section = {
  id: number;
  title: string;
  content: string;
};

type Lesson = {
  id: number;
  title: string;
  sections: Section[];
};

type Module = {
  id: number;
  name: string;
  lessons: Lesson[];
};

export default function InteractiveEditor() {
  const [modules, setModules] = useState<Module[]>([]); // Array of modules with lessons
  const [selectedModuleName, setSelectedModuleName] = useState('');
  const [selectedLessonName, setSelectedLessonName] = useState('');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  // Handle adding new section
  const handleAddSection = () => {
    if (newSectionTitle.trim() === '' || newSectionContent.trim() === '') return;

    // Check if module and lesson are selected
    if (!selectedModuleName.trim() || !selectedLessonName.trim()) {
      alert("Please specify both module and lesson names.");
      return;
    }

    // Add new section under the module and lesson
    const newSection: Section = {
      id: Date.now(),
      title: newSectionTitle,
      content: newSectionContent,
    };

    setModules((prevModules) => {
      const existingModule = prevModules.find(
        (module) => module.name === selectedModuleName
      );

      if (existingModule) {
        // Module exists, now check if the lesson exists
        const existingLesson = existingModule.lessons.find(
          (lesson) => lesson.title === selectedLessonName
        );

        if (existingLesson) {
          // Lesson exists, just add the section
          return prevModules.map((module) =>
            module.name === selectedModuleName
              ? {
                  ...module,
                  lessons: module.lessons.map((lesson) =>
                    lesson.title === selectedLessonName
                      ? {
                          ...lesson,
                          sections: [...lesson.sections, newSection],
                        }
                      : lesson
                  ),
                }
              : module
          );
        } else {
          // Lesson doesn't exist, create new lesson and add section
          return prevModules.map((module) =>
            module.name === selectedModuleName
              ? {
                  ...module,
                  lessons: [
                    ...module.lessons,
                    { id: Date.now(), title: selectedLessonName, sections: [newSection] },
                  ],
                }
              : module
          );
        }
      } else {
        // Module doesn't exist, create new module and lesson with the section
        const newModule: Module = {
          id: Date.now(),
          name: selectedModuleName,
          lessons: [
            {
              id: Date.now(),
              title: selectedLessonName,
              sections: [newSection],
            },
          ],
        };
        return [...prevModules, newModule];
      }
    });

    // Clear the input fields after adding the section
    setNewSectionTitle('');
    setNewSectionContent('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">✍️ Interactive Section Editor</h2>

      {/* Input for Module Name and Lesson Name */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Module Name"
          value={selectedModuleName}
          onChange={(e) => setSelectedModuleName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Lesson Name"
          value={selectedLessonName}
          onChange={(e) => setSelectedLessonName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Add New Section Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New Section Title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="New Section Content"
          value={newSectionContent}
          onChange={(e) => setNewSectionContent(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddSection}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Section
        </button>
      </div>

      {/* Display Modules, Lessons, and Sections */}
      {modules.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Modules and Lessons</h3>
          {modules.map((module) => (
            <div key={module.id} className="border p-4 rounded bg-gray-100 space-y-2">
              <h4 className="font-semibold">{module.name}</h4>
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="space-y-2">
                  <h5 className="font-semibold">{lesson.title}</h5>
                  {lesson.sections.map((section) => (
                    <div key={section.id} className="border p-2 rounded bg-gray-200">
                      <h6 className="font-semibold">{section.title}</h6>
                      <p>{section.content}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
