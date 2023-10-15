import InformationPanel from "@/components/InformationPanel";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import RainChart from "@/components/RainChart";
import HumidityChart from "@/components/HumidityChart";


export const revalidate = 60;

type Props = {
    params: {
        city: string;
        lat: string;
        long: string;
    };
};

async function WeatherPage({params: {city, lat, long}}: Props) {

    const response = await fetch(`http://127.0.0.1:5000/test?lat=${lat}&long=${long}`);
    const data = await response.json();
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
        <InformationPanel 
            city={city}
            results={data}
            lat={lat}
            long={long}
        />
        <div className="flex-1 p-5 lg:p-10">
            <div className="p-5">
                <div className="pb-5">
                    <h2 className="text-xl font-bold">Today Overview</h2>
                    <p className="text-sm text-gray-400">
                        Last updated at: {" "}
                        {new Date(data.current_weather.time).toLocaleString()} (
                            {data.timezone})
                        </p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                    <StatCard 
                        title="Maximum Temperature"
                        metric={`${data.daily.temperature_2m_max[0].toFixed(1)}°`}
                        color="yellow"
                    />
                    <StatCard 
                        title="Minimum Temperature"
                        metric={`${data.daily.temperature_2m_min[0].toFixed(1)}°`}
                        color="green"
                    />
                    <div>
                        <StatCard 
                            title="UV Index"
                            metric={data.daily.uv_index_clear_sky_max[0].toFixed(1)}
                            color="rose"
                        />
                    </div>
                    <div className="flex space-x-3">
                        <StatCard 
                            title="Wind Speed"
                            metric={`${data.current_weather.windspeed.toFixed(1)}m/s`}
                            color="cyan"
                        />
                        <StatCard 
                            title="Wind Direction"
                            metric={`${data.current_weather.winddirection.toFixed(1)}°`}
                            color="violet"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-5" />
            <div className="space-y-3">
                <TempChart results={data}/>
                <RainChart results={data}/>
                <HumidityChart results={data}/>
            </div>
        </div>
    </div>
  )
}

export default WeatherPage;