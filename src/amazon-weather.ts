const CITY_TO_LAT_LONG = {
  London: [52.52, 13.41],
  SanFran: [51, 12],
};

const fetchTemperature = async (lat: number, long: number): Promise<number> => {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("calling api");
  const data = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const parsedData = await data.json();
  return parsedData.current_weather.temperature;
};

const TIME_TO_LIVE = 1_000 * 60;

type CacheEntry = {
  temperature: number;
  requestTime: number;
  lastAccessedTime: number;
};

class WeatherClient {
  private cityToTemperature: Record<string, CacheEntry> = {};

  constructor() {}

  public async fetchTemperatureForCity(city: string): Promise<number | null> {
    const cityLatLon = CITY_TO_LAT_LONG[city];
    if (!cityLatLon) return null;

    const cacheHit = this.cityToTemperature[city];
    if (cacheHit) {
      const currentTime = Date.now();
      const timeSinceRequest = currentTime - cacheHit.requestTime;
      if (timeSinceRequest < TIME_TO_LIVE) {
        cacheHit["lastAccessedTime"] = currentTime;
        return cacheHit.temperature;
      }
    }

    const temperature = await fetchTemperature(cityLatLon[0], cityLatLon[1]);

    const currentTime = Date.now();

    const cacheEntries = Object.entries(this.cityToTemperature);
    if (cacheEntries.length <= 5 && city in this.cityToTemperature) {
      this.cityToTemperature[city] = {
        temperature,
        requestTime: currentTime,
        lastAccessedTime: currentTime,
      };
      return temperature;
    }
    // cache is full, need to ejcct
    let leastRecentlyEntry: [string, CacheEntry] | null = null;
    for (const entry of cacheEntries) {
      if (!leastRecentlyEntry) {
        leastRecentlyEntry = entry;
      }
      if (entry[1].lastAccessedTime < leastRecentlyEntry[1].lastAccessedTime) {
        leastRecentlyEntry = entry;
      }
    }
    delete this.cityToTemperature.leastRecentlyEntry;

    this.cityToTemperature[city] = {
      temperature,
      requestTime: currentTime,
      lastAccessedTime: currentTime,
    };
    return temperature;
  }
}

const main = async () => {
  const weatherClient = new WeatherClient();

  await weatherClient.fetchTemperatureForCity("London");
  await weatherClient.fetchTemperatureForCity("London");
  await new Promise((res) => setTimeout(res, 1000)); // 1 second
  await weatherClient.fetchTemperatureForCity("London");
};

main();
