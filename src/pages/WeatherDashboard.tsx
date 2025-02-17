import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import WeatherSkeleton from '@/components/ui/loading-skeleton';
import CurrentWeather from '@/components/Weather/CurrentWeather';
import { HourlyTemperature } from '@/components/Weather/HourlyTemperature';
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
        <div className='space-y-4'>
            {/* fav cities */}

            <div className="flex items-center justify-between mx-auto px-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw className={`w-4 h-4 ${weatherQuery.isFetching || forecastQuery.isFetching ? 'animate-spin' : ''}`} />

                </Button>
            </div>
            {/* current & hourly weather */}
            <div className='grid gap-6'>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* current weather */}
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    {/*hourly temperature */}
                    <HourlyTemperature data={forecastQuery.data} />
                </div>
                <div>
                    {/* details */}
                    {/* forecast */}
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboard