# weather_api.py

import requests
import json
from urllib.parse import quote
import numpy as np # Make sure numpy is imported if using np.nan

# (Keep the rest of the imports and functions like load_model etc. as they are)

def get_weather_data(city):
    """
    Fetch weather and air quality data for a given city using OpenWeatherMap for weather
    and WAQI API for air quality data. Tries to fetch O3 and NO2 as well.

    Args:
        city (str): Name of the city

    Returns:
        dict: Dictionary containing weather and air quality data (using None for unavailable data)
    """
    # OpenWeatherMap API key
    WEATHER_API_KEY = "07fa82a895d3c697ca089e9fc0615684" # Consider storing keys securely
    # World Air Quality Index API token
    WAQI_API_TOKEN = "654a5676ff742003d3bf29f078955e22b8a88201" # Consider storing keys securely

    encoded_city = quote(city)

    try:
        # --- Step 1: Get coordinates ---
        geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={encoded_city}&limit=1&appid={WEATHER_API_KEY}"
        geo_response = requests.get(geo_url)
        geo_response.raise_for_status()
        geo_data = geo_response.json()

        if not geo_data:
            raise ValueError(f"Could not find location data for {city}")

        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']

        # --- Step 2: Get weather data (Temp, Humidity, Wind) ---
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={WEATHER_API_KEY}"
        weather_response = requests.get(weather_url)
        weather_response.raise_for_status()
        weather_data = weather_response.json()

        # --- Step 3: Get air quality data (AQI, PM2.5, PM10, O3, NO2) ---
        aqi = None
        pm10 = None
        pm25 = None
        o3 = None # Initialize O3
        no2 = None # Initialize NO2
        waqi_station_data = None # To store the specific station data if found

        # Try WAQI by city name first
        waqi_url_city = f"https://api.waqi.info/feed/{encoded_city}/?token={WAQI_API_TOKEN}"
        waqi_response_city = requests.get(waqi_url_city)
        waqi_data_city = waqi_response_city.json()

        if waqi_data_city.get('status') == 'ok':
            waqi_station_data = waqi_data_city.get('data', {})

        # If city search failed or didn't return data, try WAQI by geo
        if not waqi_station_data:
            waqi_url_geo = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={WAQI_API_TOKEN}"
            waqi_response_geo = requests.get(waqi_url_geo)
            waqi_data_geo = waqi_response_geo.json()
            if waqi_data_geo.get('status') == 'ok':
                waqi_station_data = waqi_data_geo.get('data', {})

        # Extract data if we got a valid response from WAQI
        if waqi_station_data:
             aqi = waqi_station_data.get('aqi', None) # Get raw AQI
             iaqi = waqi_station_data.get('iaqi', {}) # Pollutant specific values
             pm10_data = iaqi.get('pm10', {})
             pm25_data = iaqi.get('pm25', {}) or iaqi.get('pm2_5', {}) # Try both keys
             o3_data = iaqi.get('o3', {})   # Extract O3 data dict
             no2_data = iaqi.get('no2', {}) # Extract NO2 data dict

             pm10 = pm10_data.get('v', None)
             pm25 = pm25_data.get('v', None)
             o3 = o3_data.get('v', None)    # Get O3 value
             no2 = no2_data.get('v', None)   # Get NO2 value

        # Fallback to OpenWeatherMap Air Pollution API ONLY if WAQI failed entirely
        # Note: OWM often doesn't provide a direct AQI comparable to WAQI's scale
        # and might have different components. Prioritize WAQI.
        if aqi is None: # Check if we got at least AQI from WAQI
            print(f"Warning: WAQI data not available/complete for {city}. Falling back to OpenWeatherMap Air Pollution API (may lack comparable AQI/O3/NO2).")
            air_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
            air_response = requests.get(air_url)
            # Don't raise status here, just check if data is present
            if air_response.status_code == 200:
                air_data = air_response.json()
                if air_data.get('list'):
                    components = air_data['list'][0].get('components', {})
                    # Fill only if missing from WAQI attempt
                    pm10 = pm10 if pm10 is not None else components.get('pm10', None)
                    pm25 = pm25 if pm25 is not None else components.get('pm2_5', None)
                    o3 = o3 if o3 is not None else components.get('o3', None)
                    no2 = no2 if no2 is not None else components.get('no2', None)
                    # OWM 'aqi' is 1-5, not directly usable here unless model was trained on it.
                    # Leave `aqi` as None if not from WAQI.
            else:
                 print(f"Warning: OpenWeatherMap Air Pollution API request failed with status {air_response.status_code}.")


        # --- Construct result dictionary ---
        result = {
            # Weather
            'Humidity': float(weather_data['main']['humidity']) if 'main' in weather_data and 'humidity' in weather_data['main'] else None,
            'Temperature': float(weather_data['main']['temp']) if 'main' in weather_data and 'temp' in weather_data['main'] else None,
            'WindSpeed': float(weather_data['wind']['speed']) if 'wind' in weather_data and 'speed' in weather_data['wind'] else None,
            # Air Quality (prioritize WAQI)
            'AQI': float(aqi) if aqi is not None else None, # This is the raw API AQI
            'PM10': float(pm10) if pm10 is not None else None,
            'PM2_5': float(pm25) if pm25 is not None else None,
            'O3': float(o3) if o3 is not None else None,
            'NO2': float(no2) if no2 is not None else None,
        }

        # Handle potential NaN conversion for model input (if needed)
        # We'll do this in the main prediction script now

        return result

    except requests.exceptions.RequestException as e:
        print(f"API Request Error fetching data for {city}: {e}")
        raise ConnectionError(f"Failed to fetch data for {city} due to API error.") from e
    except Exception as e:
        print(f"Error processing weather data for {city}: {e}")
        raise # Re-raise other exceptions

# (Keep example usage block if desired)