# Actual.py

import pandas as pd
import numpy as np
import os
import json # Import json for pretty printing the output dict
from fastai.tabular.all import *
import pathlib
import platform

# Assuming weather_api.py contains the modified get_weather_data
from weather_api import get_weather_data

# --- Path configuration ---
script_dir = pathlib.Path(__file__).parent
model_dir = script_dir
model_path = model_dir / "model3.pkl"

# --- Patch for loading Linux-saved model on Windows ---
if platform.system() == "Windows":
    print("Applying PosixPath patch for Windows.")
    temp = pathlib.PosixPath
    pathlib.PosixPath = pathlib.WindowsPath
# --- End Patch ---

def load_model(model_path=model_path):
    """Loads the FastAI model (unchanged from previous version)."""
    model_path = pathlib.Path(model_path)
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found at {model_path}")

    print(f"Loading model from: {model_path}")
    try:
        learn = load_learner(model_path)
        print("Model loaded successfully.")
        if hasattr(learn, 'dls') and learn.dls is not None:
            print(f"Model continuous features expected: {learn.dls.cont_names}")
            print(f"Model categorical features expected: {learn.dls.cat_names}")
        else:
            print("Warning: Learner's DataLoaders (dls) not found.")
        return learn
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

# --- ADD Helper function for AQI Category ---
def get_aqi_category(aqi_value):
    """Determines the AQI category based on standard US EPA breakpoints."""
    if aqi_value is None:
        return "Unknown"
    elif 0 <= aqi_value <= 50:
        return "Good"
    elif 51 <= aqi_value <= 100:
        return "Moderate"
    elif 101 <= aqi_value <= 150:
        return "Unhealthy for Sensitive Groups"
    elif 151 <= aqi_value <= 200:
        return "Unhealthy"
    elif 201 <= aqi_value <= 300:
        return "Very Unhealthy"
    elif aqi_value > 300:
        return "Hazardous"
    else:
        return "Unknown" # Handle negative or unexpected values

# --- Modify predict_health_impact to return raw data ---
def predict_health_impact(city, learn):
    """
    Fetches data, prepares input, predicts score, and returns score AND raw data.

    Args:
        city (str): Name of the city
        learn (object): Loaded FastAI learner object

    Returns:
        tuple: (predicted_score, raw_weather_data_dict)
    """
    try:
        # Get weather data from API (now includes O3, NO2)
        weather_data = get_weather_data(city)
        print(f"\nRaw weather data fetched for {city}:")
        # Use json.dumps for cleaner printing of the dict
        print(json.dumps(weather_data, indent=2))

        # Prepare input for learn.predict
        if hasattr(learn, 'dls') and learn.dls is not None:
            cont_names = learn.dls.cont_names
            cat_names = learn.dls.cat_names
        else:
            # !! FALLBACK: Manually define if dls is missing !!
            print("Warning: dls not found. Using manually defined features.")
            cont_names = ['AQI', 'Humidity', 'PM10', 'PM2_5', 'Temperature', 'WindSpeed'] # Adjust if needed! Include O3, NO2 if model uses them
            cat_names = []

        input_dict = {}
        # Populate features, converting None to np.nan for the model
        for feature in cont_names:
            value = weather_data.get(feature, None) # Get value or None
            input_dict[feature] = np.nan if value is None else float(value) # Use NaN if None

        for feature in cat_names:
            input_dict[feature] = str(weather_data.get(feature, '#na#'))

        input_series = pd.Series(input_dict)
        expected_order = cat_names + cont_names
        try:
             ordered_input_series = input_series[expected_order]
        except KeyError as e:
             print(f"Error: Feature mismatch preparing input series. Missing key: {e}")
             print(f"Expected features: {expected_order}")
             print(f"Features available in input_dict: {list(input_dict.keys())}")
             raise ValueError("Input data missing expected features for the model.") from e

        print("\nInput Series prepared for model (order matters):")
        print(ordered_input_series)

        # Make prediction
        input_df_row = pd.DataFrame([ordered_input_series])
        # Check for NaNs before prediction if FillMissing wasn't used reliably
        if input_df_row.isnull().values.any():
             print("Warning: NaN values present in input to model. Ensure FillMissing proc was used during training.")

        row, pred_tensor, raw_preds = learn.predict(input_df_row.iloc[0])

        print(f"\nRaw model prediction tensor: {pred_tensor}")

        # Extract the predicted value
        if pred_tensor.numel() == 1:
             predicted_score = pred_tensor.item()
        else:
             print(f"Warning: Unexpected prediction tensor shape: {pred_tensor.shape}.")
             predicted_score = pred_tensor[0].item()

        print(f"Model Predicted Score (before adjustment): {predicted_score:.2f}")

        # <<< MODIFICATION: Return score AND raw data >>>
        return predicted_score, weather_data

    except (FileNotFoundError, ConnectionError, ValueError, KeyError) as e:
         # Propagate specific errors for handling in main
         print(f"Error within predict_health_impact: {e}")
         raise
    except Exception as e:
        print(f"Unexpected error during prediction process for {city}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise Exception(f"Prediction failed for {city}.") from e


# --- Modify main to adjust score and format output ---
def main():
    """
    Main function to load model, get user input, predict, adjust score,
    and print the final results dictionary.
    """
    try:
        learn = load_model()

        while True:
            final_output_dict = {} # Initialize dict for each loop
            try:
                city_name = input("Enter city name (or type 'quit' to exit): ")
                if city_name.lower() == 'quit':
                    break

                # <<< MODIFICATION: Get score AND raw data >>>
                health_score_raw, raw_data = predict_health_impact(city_name, learn)

                # <<< MODIFICATION: Adjust score and clamp at 0 >>>
                score_adjustment = -20
                adjusted_health_score = max(0, health_score_raw + score_adjustment)
                print(f"Adjusted Health Impact Score: {adjusted_health_score:.2f} (Raw: {health_score_raw:.2f}, Adjustment: {score_adjustment})")

                # Determine Health Impact Class based on ADJUSTED score
                # Using the interpretation ranges from your original Actual.py
                if adjusted_health_score >= 80:
                    health_impact_class = "Very High Impact Risk"
                elif adjusted_health_score >= 60:
                     health_impact_class = "High Impact Risk"
                elif adjusted_health_score >= 40:
                     health_impact_class = "Moderate Impact Risk"
                elif adjusted_health_score >= 20:
                     health_impact_class = "Low Impact Risk"
                else:
                     health_impact_class = "Very Low Impact Risk"

                # Get Raw API AQI and its Category
                raw_api_aqi = raw_data.get('AQI', None)
                aqi_category = get_aqi_category(raw_api_aqi)

                # <<< MODIFICATION: Construct the final output dictionary >>>
                final_output_dict = {
                    'location': city_name,
                    'aqi': raw_api_aqi, # The raw AQI value from the API
                    'category': aqi_category, # Category based on raw AQI
                    'pollutants': {
                        # Use .get() to safely retrieve values, defaulting to None
                        'pm25': raw_data.get('PM2_5', None),
                        'pm10': raw_data.get('PM10', None),
                        'o3': raw_data.get('O3', None),
                        'no2': raw_data.get('NO2', None)
                    },
                    'healthImpactScore': round(adjusted_health_score, 2), # Adjusted score
                    'healthImpactClass': health_impact_class # Class based on adjusted score
                }

                print("\n--- Final Output ---")
                print(json.dumps(final_output_dict, indent=4)) # Pretty print the dict
                print("--------------------\n")


            # Handle errors for a single city prediction attempt
            except (ConnectionError, ValueError, KeyError, Exception) as e:
                 print(f"\n--- Error Processing {city_name} ---")
                 print(f"Error: {e}")
                 # Optionally print traceback for unexpected errors
                 # if not isinstance(e, (ConnectionError, ValueError, KeyError)):
                 #    import traceback
                 #    traceback.print_exc()
                 print("Please check input or API status and try again.")
                 print("-----------------------------------------\n")
            except EOFError:
                 print("\nInput stream closed. Exiting.")
                 break


    except (FileNotFoundError, ImportError) as e:
        print(f"\n--- Initialization Failed ---")
        print(f"Failed to initialize: {str(e)}")
        print("Ensure model file exists and libraries are installed.")
        print("-----------------------------\n")
    except Exception as e:
        print(f"\n--- Critical Error ---")
        print(f"A critical error occurred during setup: {str(e)}")
        import traceback
        traceback.print_exc()
        print("----------------------\n")

if __name__ == "__main__":
    main()