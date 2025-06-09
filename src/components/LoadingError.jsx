export default function LoadingError({ loading, error }) {
  if (loading) {
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  return null;
}
