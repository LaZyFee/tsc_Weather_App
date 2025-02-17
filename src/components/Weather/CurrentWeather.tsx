import { GeoCodingResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeoCodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {

    const {
        weather: [CurrentWeather],
        main: { temp, temp_min, temp_max, feels_like, humidity },
        wind: { speed },
    } = data

    const formatTemp = (temp: number) => `${Math.round(temp)}°C`


    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end gap-2">
                                <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                                {
                                    locationName?.state && (
                                        <span className="text-muted-foreground">, {locationName.state}</span>
                                    )
                                }
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {locationName?.country}
                            </p>
                        </div>
                        {/* temp */}
                        <div className="flex items-center gap-2">
                            {/* temp */}
                            <p className="text-5xl tracking-tighter font-bold">
                                {formatTemp(temp)}
                            </p>
                            <div className="space-y-1">
                                {/* feels like */}
                                <p className="text-sm text-muted-foreground font-medium">Feels like: {formatTemp(feels_like)}</p>
                                <div className="flex gap-2 text-sm font-medium">
                                    {/* min temp */}
                                    <span className="flex items-center gap-1 text-blue-500">
                                        <ArrowDown className="w-4 h-4" />
                                        {formatTemp(temp_min)}
                                    </span>
                                    {/* max temp */}
                                    <span className="flex items-center gap-1 text-red-500">
                                        <ArrowUp className="w-4 h-4" />
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {/* humadity */}
                            <div className="flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Humidity</p>
                                    <p className="text-sm font-muted-foreground">{humidity}%</p>
                                </div>
                            </div>
                            {/* wind */}
                            <div className="flex items-center gap-2">
                                <Wind className="w-4 h-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Wind Speed</p>
                                    <p className="text-sm font-muted-foreground">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* weather icon */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@2x.png`}
                                alt={CurrentWeather.description}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capatitalize">{CurrentWeather.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CurrentWeather