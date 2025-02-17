import { ForecastData } from '@/api/type'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
interface HourlyTemperatureProps {
    data: ForecastData
}




export const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {

    const ChartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }))




    return (
        <Card className='w-fit'>
            <CardHeader>
                <CardTitle>
                    Today's Temperature
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full items-center justify-center">
                    <ResponsiveContainer
                        width={"100%"}
                        height={"100%"}
                    >
                        <LineChart data={ChartData}>
                            {/* axis */}
                            <XAxis
                                dataKey={"time"}
                                stroke='#8884d8'
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}

                            />
                            <YAxis
                                stroke='#8884d8'
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°C`}

                            />
                            {/* tooltip */}
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className='rounded-lg border bg-background p-2 shadow-sm'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-[0.70rem] UPPERCASE text-muted-foreground'>
                                                            Temprature
                                                        </span>
                                                        <span className='font-bold'>
                                                            {payload[0].value}°C
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <span className='text-[0.70rem] UPPERCASE text-muted-foreground'>
                                                                Feels like
                                                            </span>
                                                            <span className='font-bold'>
                                                                {payload[1].value}°C
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }
                                    return null
                                }}
                            />

                            {/* line */}
                            <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="feels_like" stroke="#8884d8" strokeWidth={2} dot={false} strokeDasharray={"5 5"} />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>



        </Card>
    )
}
