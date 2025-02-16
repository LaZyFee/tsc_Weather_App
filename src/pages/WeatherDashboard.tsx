import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import WeatherSkeleton from '@/components/ui/loading-skeleton';
import { useGeoLocation } from '@/hooks/use-geo-location'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

function WeatherDashboard() {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeoLocation();



    const handleRefresh = () => {
        getLocation()
        if (coordinates) {
            //reload weather data

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







    return (
        <div className='space-y-4'>
            {/* fav cities */}

            <div className="flex items-center justify-between mx-auto px-4">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant={'outline'}
                    size={'icon'}
                // onClick={() => {}}
                // disabled={isLoading}
                >
                    <RefreshCw className='w-4 h-4' />

                </Button>
            </div>
            {/* current & hourly weather */}
        </div>
    )
}

export default WeatherDashboard