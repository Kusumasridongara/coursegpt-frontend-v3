// app/page.tsx
import ClientInteractiveEditor from '@/components/ClientInteractiveEditor';
import ModuleOrganizer from '@/components/ModuleOrganizer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-center text-blue-700">CourseGPT 🎓</h1>
        <p className="text-center mt-2 text-gray-600">
          Generate AI-powered lessons in seconds.
        </p>
        <ClientInteractiveEditor /> {/* Use the client-side wrapper component */}
      </section>

      <section>
        <ModuleOrganizer />
      </section>
    </main>
  );
}
