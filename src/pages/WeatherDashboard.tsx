import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import WeatherSkeleton from '@/components/ui/loading-skeleton';
import CurrentWeather from '@/components/Weather/CurrentWeather';
import { HourlyTemperature } from '@/components/Weather/HourlyTemperature';
import { WeatherDetails } from '@/components/Weather/WeatherDetails';
import { WeatherForecast } from '@/components/Weather/WeatherForecast';
import { useGeoLocation } from '@/hooks/use-geo-location'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

function WeatherDashboard() {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeoLocation();
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation()
        if (coordinates) {
            //reload weather data
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    }

    if (locationLoading) {
        return <WeatherSkeleton />
    }
    if (locationError) {
        return (
            <Alert variant={'destructive'}>
                <AlertTriangle className='w-4 h-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>{locationError}</p>
                    <Button
                        onClick={handleRefresh}
                        variant={'outline'}
                        className='w-fit'
                    >
                        <MapPin className='w-4 h-4 mr-2' />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant={'destructive'}>
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription>
                    <p>Please enable location access to see your local weather</p>
                    <Button
                        onClick={getLocation}
                        variant={'outline'}
                        className='w-fit'
                    >
                        <MapPin className='w-4 h-4 mr-2' />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }


    const locationName = locationQuery.data?.[0]

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant={'destructive'}>
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription>
                    <p>Failed to fetch weather data. Please try again</p>
                    <Button
                        onClick={handleRefresh}
                        variant={'outline'}
                        className='w-fit'
                    >
                        <RefreshCw className='w-4 h-4 mr-2' />
                        retry
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }
    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />
    }


    return (
        <div className="space-y-4">
            {/* <FavoriteCities /> */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""
                            }`}
                    />
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CurrentWeather
                        data={weatherQuery.data}
                        locationName={locationName}
                    />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboard