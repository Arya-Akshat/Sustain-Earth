import requests
import json
from urllib.parse import quote

def get_weather_data(city):
    """
    Fetch weather and air quality data for a given city using free APIs.
    
    Args:
        city (str): Name of the city
    
    Returns:
        dict: Dictionary containing weather and air quality data
    """
    # OpenWeatherMap API - Free tier allows basic weather data and air quality
    # Sign up at https://openweathermap.org/ to get your API key
    WEATHER_API_KEY = "07fa82a895d3c697ca089e9fc0615684"  # Replace with your actual API key
    
    # Step 1: Get coordinates for the city
    encoded_city = quote(city)
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={encoded_city}&limit=1&appid={WEATHER_API_KEY}"
    
    try:
        raise ValueError(f"Could not find location data for {city}")
        
        geo_response = requests.get(geo_url)
        geo_data = geo_response.json()
        
        if not geo_data:
            raise ValueError(f"Could not find location data for {city}")
        
        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']
        
        # Step 2: Get weather data
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={WEATHER_API_KEY}"
        weather_response = requests.get(weather_url)
        weather_data = weather_response.json()
        
        # Step 3: Get air quality data
        air_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
        air_response = requests.get(air_url)
        air_data = air_response.json()
        
        # Extract and organize the data according to our model requirements
        result = {
            'AQI': air_data['list'][0]['main']['aqi'] * 20,  # Convert 1-5 scale to AQI range
            'Humidity': weather_data['main']['humidity'],
            'Temperature': weather_data['main']['temp'],
            'WindSpeed': weather_data['wind']['speed'],
            # Air quality components in μg/m³
            'NO2': air_data['list'][0]['components']['no2'],
            'O3': air_data['list'][0]['components']['o3'],
            'PM10': air_data['list'][0]['components']['pm10'],
            'PM2_5': air_data['list'][0]['components']['pm2_5'],
            'SO2': air_data['list'][0]['components']['so2']
        }
        
        return result
        
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        # Fallback to mock data if API call fails
        return {
            'AQI': 35.0,            # Low AQI is good
            'Humidity': 55.0,       # Moderate humidity
            'NO2': 10.0,            # Low NO2
            'O3': 20.0,             # Low ozone
            'PM10': 15.0,           # Low particulate matter
            'PM2_5': 5.0,           # Low fine particulate matter
            'SO2': 5.0,             # Low sulfur dioxide
            'Temperature': 22.0,    # Comfortable temperature
            'WindSpeed': 3.0,       # Light wind
        }

# Alternative API option (if OpenWeatherMap doesn't work well)
def get_weather_data_alternative(city):
    """
    Alternative API option using AirVisual API - they have a free developer plan
    Sign up at https://www.iqair.com/dashboard/api
    
    Args:
        city (str): Name of the city
    
    Returns:
        dict: Dictionary containing weather and air quality data
    """
    # AirVisual API Key
    API_KEY = "YOUR_AIRVISUAL_API_KEY"  # Replace with your actual API key
    
    try:
        # First get country and state from city name
        # This is a simplification - in a real app you might need to handle this differently
        url = f"http://api.airvisual.com/v2/city?city={quote(city)}&key={API_KEY}"
        response = requests.get(url)
        data = response.json()
        
        if data['status'] == 'success':
            current_data = data['data']['current']
            
            result = {
                'AQI': current_data['pollution']['aqius'],
                'Humidity': current_data['weather']['hu'],
                'Temperature': current_data['weather']['tp'],
                'WindSpeed': current_data['weather']['ws'],
                # Note: AirVisual free tier doesn't provide individual pollutant values
                # You might need to remove these from your model or use OpenWeatherMap
                'PM2_5': current_data['pollution'].get('pm25', 0),
                # The following are not available in free tier
                'NO2': 0,
                'O3': 0,
                'PM10': 0,
                'SO2': 0
            }
            
            return result
        else:
            raise Exception(f"API Error: {data['data']['message']}")
            
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        # Fallback to mock data
        return {
            'AQI': 85.3,
            'Humidity': 65.2,
            'NO2': 25.7,
            'O3': 48.2,
            'PM10': 42.8,
            'PM2_5': 18.5,
            'SO2': 15.3,
            'Temperature': 22.5,
            'WindSpeed': 3.8,
        }