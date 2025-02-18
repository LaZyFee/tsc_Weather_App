import { WeatherData } from '@/api/type'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';


interface WeatherDetailsProps {
    data: WeatherData,

}


export const WeatherDetails = ({ data }: WeatherDetailsProps) => {

    const { wind, main, sys } = data

    const getWindDirection = (deg: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
        return directions[index];
    };
    const formatTime = (time: number) => new Date(time * 1000).toLocaleTimeString();

    const details = [
        {
            title: 'Sunrise',
            value: formatTime(sys.sunrise),
            Icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: 'Sunset',
            value: formatTime(sys.sunset),
            Icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: 'Wind Direction',
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            Icon: Compass,
            color: "text-green-500"
        },
        {
            title: 'Pressure',
            value: `${main.pressure} hPa`,
            Icon: Gauge,
            color: "text-purple-500"
        },

    ]

    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Weather Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-6 sm:grid-cols-2'>
                    {details.map((detail) => (
                        <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                            <detail.Icon className={`h-5 w-5 ${detail.color}`} />
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">{detail.title}</p>
                                <p className="text-sm font-medium leading-none">{detail.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </CardContent>


        </Card>
    )
}
