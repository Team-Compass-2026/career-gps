export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sign in to Career GPS
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your email to continue
        </p>
        {/* Auth form would go here */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
              placeholder="you@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}