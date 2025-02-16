import { useQuery } from '@tanstack/react-query';
import { Coordinates } from "@/api/type";
import { weatherAPI } from '@/api/weather';



export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
} as const

export function useWeatherQuery(Coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(Coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => Coordinates ? weatherAPI.getCurrentWeather(Coordinates) : null,
        enabled: !!Coordinates

    })
}
export function useForecastQuery(Coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(Coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => Coordinates ? weatherAPI.getForecast(Coordinates) : null,
        enabled: !!Coordinates

    })
}
export function useReverseGeocodeQuery(Coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(Coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => Coordinates ? weatherAPI.reverseGeocode(Coordinates) : null,
        enabled: !!Coordinates
    })
}