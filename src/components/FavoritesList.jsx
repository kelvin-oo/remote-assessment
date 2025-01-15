export default function FavoritesList({ favorites, onSelectCity, onRemove }) {
  if (favorites.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">Favorite Cities</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {favorites.map(city => (
          <div
            key={city}
            className="bg-white/20 backdrop-blur-lg rounded-lg p-4 flex justify-between items-center"
          >
            <button
              onClick={() => onSelectCity(city)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              {city}
            </button>
            <button
              onClick={() => onRemove(city)}
              className="text-white/70 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}