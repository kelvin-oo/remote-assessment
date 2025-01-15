import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import { MapPin, Loader, X } from 'lucide-react';



export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('celsius')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = import.meta.env.VITE_API_KEY;


  const fetchWeather = async (city) => {
   
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      })
      setWeather(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }


  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        )
      },
      (err) => {
        setError('Unable to retrieve your location')
        setLoading(false)
      }
    )
  }

  const toggleFavorite = (city) => {
    setFavorites(prev => {
      if (prev.includes(city)) {
        return prev.filter(c => c !== city)
      }
      return [...prev, city]
    })
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(apiUrl, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
      setWeather(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      <div className="min-h-screen backdrop-blur-sm bg-black/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Weather Dashboard
            </h1>
            <p className="mt-3 text-blue-100 text-lg">
              Check the wether anywhere in the world
            </p>
          </div>

          {/* Search */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar onSearch={fetchWeather} />
              </div>
              <button
                onClick={getCurrentLocation}
                className="group flex items-center justify-center gap-2 px-6 py-3 
                         bg-white/10 hover:bg-white/20 text-white rounded-xl
                         transition-all duration-200 hover:shadow-lg
                         border border-white/20 hover:border-white/40"
              >
                <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">Current Location</span>
              </button>
            </div>

            {/* Loader */}
            {loading && (
              <div className="flex items-center justify-center gap-3 text-white mt-8">
                <Loader className="w-6 h-6 animate-spin" />
                <span className="text-lg">Fetching weather data...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/40 cursor-pointer">
                <div className="flex items-center gap-2 text-red-100">
                 <X onClick={(() => {
                  setError(null)
                 })} />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Weather Card */}
          {weather && (
            <div className="mt-6 transform transition-all duration-300">
              <WeatherCard 
                weather={weather}
                unit={unit}
                onToggleUnit={toggleUnit}
                isFavorite={favorites.includes(weather.name)}
                onToggleFavorite={() => toggleFavorite(weather.name)}
              />
            </div>
          )}

          {/* Favorites */}
          <div className="mt-8">
            <FavoritesList
              favorites={favorites}
              onSelectCity={fetchWeather}
              onRemove={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  )
}