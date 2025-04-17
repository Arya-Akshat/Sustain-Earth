import requests
import json
from urllib.parse import quote

def Range_aqi(aqi_level):
    # OldMax, OldMin = 5, 1
    # NewMax, NewMin = 300,0
    # OldRange = OldMax - OldMin
    # NewRange = NewMax - NewMin
    # NewValue = (((orignal - OldMin) * NewRange) / OldRange) + NewMin
    # return NewValue
    # Range bounds
    mapping = {
        1: 25,    # Good
        2: 75,    # Fairclear
        3: 125,   # Moderate
        4: 175,   # Poor
        5: 250    # Very Poor
    }
    return mapping.get(aqi_level, None)  # Returns None if input is invalid

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
        # Fetch coordinates    
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
            'AQI': Range_aqi(air_data['list'][0]['main']['aqi']),  # Convert 1-5 scale to AQI range
            'Humidity': weather_data['main']['humidity'],
            'Temperature': weather_data['main']['temp'],
            'WindSpeed': weather_data['wind']['speed'],
            # Air quality components in μg/m³
            'PM10': air_data['list'][0]['components']['pm10'],
            'PM2_5': air_data['list'][0]['components']['pm2_5'],
        }
        
        return result
        
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        # Fallback to mock data if API call fails
        return {
            'AQI': 187.0,            # Low AQI is good
            'Humidity': 84.0,       # Moderate humidity
            'PM10': 296.0,           # Low particulate matter
            'PM2_5': 13.0,           # Low fine particulate matter
            'Temperature': 5.0,    # Comfortable temperature
            'WindSpeed': 6.0,       # Light wind
        }

