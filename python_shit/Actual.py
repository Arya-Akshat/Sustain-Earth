import pandas as pd
import numpy as np
import pickle
import os
from fastai.tabular.all import *
from weather_api import get_weather_data
import pathlib
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

def load_model(model_path="model1.pkl"):
    """
    Load the FastAI model from pickle file
    
    Args:
        model_path (str): Path to the model1.pkl file
    
    Returns:
        object: Loaded FastAI learner
    """
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    
    try:
        # Load the FastAI model
        learn = load_learner(model_path)
        return learn
    except Exception as e:
        raise Exception(f"Error loading model: {str(e)}")

def normalize_input_data(input_data, normalization_stats=None):
    """
    Normalize the input data based on the training data statistics
    
    Args:
        input_data (dict): Raw input data from weather API
        normalization_stats (dict, optional): Mean and std from training data
    
    Returns:
        pd.Series: Normalized input data
    """
    # Ideally, you should save these stats during training and load them here
    # These are approximate values based on your image data
    if normalization_stats is None:
        normalization_stats = {
            'AQI': {'mean': 0.0, 'std': 1.0},
            'Humidity': {'mean': 50.0, 'std': 20.0},
            'NO2': {'mean': 30.0, 'std': 20.0},
            'O3': {'mean': 40.0, 'std': 30.0},
            'PM10': {'mean': 40.0, 'std': 30.0},
            'PM2_5': {'mean': 20.0, 'std': 15.0},
            'SO2': {'mean': 15.0, 'std': 10.0},
            'Temperature': {'mean': 20.0, 'std': 10.0},
            'WindSpeed': {'mean': 5.0, 'std': 3.0},
        }
    
    # Normalize the data
    normalized_data = {}
    for key, value in input_data.items():
        if key in normalization_stats:
            # Normalize using z-score normalization (standard scaling)
            normalized_data[key] = (value - normalization_stats[key]['mean']) / normalization_stats[key]['std']
    
    # Convert to pandas Series
    return pd.Series(normalized_data)

def predict_health_impact(city):
    """
    Predict health impact score based on weather conditions for a given city
    
    Args:
        city (str): Name of the city
    
    Returns:
        float: Predicted health impact score (0-100)
    """
    try:
        # Get weather data from API
        weather_data = get_weather_data(city)
        print(f"Raw weather data for {city}:")
        for key, value in weather_data.items():
            print(f"  {key}: {value}")
        
        # Make sure all required inputs are present
        required_inputs = ['AQI', 'Humidity', 'NO2', 'O3', 'PM10', 'PM2_5', 'SO2', 'Temperature', 'WindSpeed']
        missing_inputs = [input_name for input_name in required_inputs if input_name not in weather_data]
        
        if missing_inputs:
            print(f"Warning: Missing inputs: {missing_inputs}")
            print("Using default values for missing inputs")
            for input_name in missing_inputs:
                weather_data[input_name] = 0  # Use neutral value
        
        # Load the model
        model_path = os.path.join("python_shit", "model1.pkl")
        learn = load_model(model_path)
        
        # Normalize the input data
        normalized_data = normalize_input_data(weather_data)
        print("\nNormalized inputs:")
        for key, value in normalized_data.items():
            print(f"  {key}: {value:.6f}")
        
        # Make prediction
        row, pred_tensor, raw_preds = learn.predict(normalized_data)
        
        # Extract the predicted value - this is your health impact score
        predicted_score = pred_tensor.item()
        
        return predicted_score
    
    except Exception as e:
        print(f"Error in prediction process: {str(e)}")
        raise

def main():
    """
    Main function to run the health impact prediction
    """
    city_name = input("Enter city name: ")
    try:
        health_score = predict_health_impact(city_name)
        print(f"\nPredicted Health Impact Score for {city_name}: {health_score:.2f}")
        
        # Interpretation of the score
        if health_score > 90:
            print("Interpretation: Excellent air quality with minimal health impact")
        elif health_score > 70:
            print("Interpretation: Good air quality with low health impact")
        elif health_score > 50:
            print("Interpretation: Moderate air quality with some health concerns")
        elif health_score > 30:
            print("Interpretation: Poor air quality with significant health concerns")
        else:
            print("Interpretation: Very poor air quality with serious health impacts")
            
    except Exception as e:
        print(f"Failed to make prediction: {str(e)}")

if __name__ == "__main__":
    main()