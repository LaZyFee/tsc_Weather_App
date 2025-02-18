import { ForecastData } from "@/api/type"
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";


interface WeatherForecastProps {
    data: ForecastData
}
interface DailyForecast {
    temp_min: number;
    temp_max: number;
    humadity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
    date: number;
}

export const WeatherForecast = ({ data }: WeatherForecastProps) => {

    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humadity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.min(acc[date].temp_max, forecast.main.temp_max);

        }
        return acc;
    }, {} as Record<string, DailyForecast>);

    const nextDays = Object.values(dailyForecasts).slice(0, 6)
    const formatTemp = (temp: number) => `${Math.round(temp)}°C`

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    5 Day Forecast
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4">
                    {nextDays.map((day) => (
                        <div key={day.date} className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                            <div className="">
                                <p className="font-medium">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                                <p className="text-sm text-muted-foreground capitalize">{day.weather.description}</p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <span className="flex text-blue-500 items-center">
                                    <ArrowDown className="h-4 w-4 mr-1" />
                                    {formatTemp(day.temp_min)}
                                </span>
                                <span className="flex text-red-500 items-center">
                                    <ArrowUp className="h-4 w-4 mr-1" />
                                    {formatTemp(day.temp_max)}
                                </span>

                            </div>
                            <div className="flex flex-col md:flex-row justify-center gap-4">
                                <span className="flex items-center gap-1">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{day.humadity}%</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Wind className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{day.wind} m/s</span>
                                </span>

                            </div>
                        </div>

                    ))}
                </div>
            </CardContent>



        </Card>
    )
}
