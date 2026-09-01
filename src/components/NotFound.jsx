const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl font-bold text-red-500 mb-4">404</h2>
      <p className="text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 text-blue-600 hover:underline">
        Return Home
      </a>
    </div>
  );
};

export default NotFound;
