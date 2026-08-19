export default function ProfilePage() {
  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Profile
      </h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Career Goals
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Data Analyst • 10 hours/week • Internship-ready within 6 months
        </p>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Skills
          </h4>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Excel (Intermediate), Statistics (Beginner), SQL (Beginner)
          </p>
        </div>
      </div>
    </main>
  );
}