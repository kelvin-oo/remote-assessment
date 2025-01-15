import React from 'react';
import { Heart, Wind, Droplets } from 'lucide-react';

export default function WeatherCard({ weather, unit, onToggleUnit, isFavorite, onToggleFavorite }) {
  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return ((temp * 9/5) + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
  };

  const timeOfDay = getTimeOfDay();
  const gradients = {
    morning: 'bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200',
    afternoon: 'bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300',
    evening: 'bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500'
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl p-4 sm:p-8 ${gradients[timeOfDay]} text-white`}>
      {/* Glass effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {weather.name}
              <span className="text-xl sm:text-2xl ml-2 opacity-80">{weather.sys.country}</span>
            </h2>
            <p className="mt-1 text-sm sm:text-lg opacity-80">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <button
            onClick={onToggleFavorite}
            className="transition-transform hover:scale-110 focus:outline-none"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-6 h-6 sm:w-8 sm:h-8 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
        </div>

        {/* Main Weather Display */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl"
            />
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <span className="text-5xl sm:text-6xl font-bold tracking-tighter">
                  {convertTemp(weather.main.temp)}°
                </span>
                {/* Toggle Switch */}
                <div className="flex items-center bg-white/20 rounded-full p-1 select-none">
                  <button
                    onClick={onToggleUnit}
                    className={`px-3 py-1 rounded-full transition-colors text-sm font-medium
                              ${unit === 'celsius' 
                                ? 'bg-white text-blue-900' 
                                : 'hover:bg-white/10'}`}
                  >
                    °C
                  </button>
                  <button
                    onClick={onToggleUnit}
                    className={`px-3 py-1 rounded-full transition-colors text-sm font-medium
                              ${unit === 'fahrenheit' 
                                ? 'bg-white text-blue-900' 
                                : 'hover:bg-white/10'}`}
                  >
                    °F
                  </button>
                </div>
              </div>
              <p className="text-lg sm:text-xl mt-2 capitalize opacity-90">
                {weather.weather[0].description}
              </p>
            </div>
          </div>

          {/* Weather */}
          <div className="flex sm:flex-col justify-center gap-6 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" />
              <span className="text-base sm:text-lg">
                {weather.main.humidity}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" />
              <span className="text-base sm:text-lg">
                {weather.wind.speed} m/s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};