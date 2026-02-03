export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="h-8 w-48 bg-gray-700 rounded" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-700 rounded-lg"
          />
        ))}
      </div>

      {/* Table */}
      <div className="h-64 bg-gray-700 rounded-lg" />
    </div>
  );
}
