export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">You don’t have permission to access this page.</p>
      <a href="/" className="text-blue-500 hover:underline">Go back to home</a>
    </div>
  );
}
