export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <section className="py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Stop guessing. Start building your career.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Your personalized career pathway—from where you are today to where you want to be.
        </p>
        <div className="mt-6">
          <a href="#"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
            Build My Career Pathway
          </a>
          <a href="#"
            className="mt-3 inline-block ml-4 text-blue-600 dark:text-blue-400 underline">
            See How It Works
          </a>
        </div>
      </section>
    </main>
  );
}