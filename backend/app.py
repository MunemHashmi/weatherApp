from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def get_weather_data():
    try:
        # Receive latitude and longitude as query parameters from the frontend
        lat_str = request.args.get('lat')
        long_str = request.args.get('long')

        # Convert latitude and longitude to float with four decimal points
        lat = round(float(lat_str), 4)
        long = round(float(long_str), 4)

        # Construct the API URL with dynamic latitude and longitude
        api_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_clear_sky_max&current_weather=true&timezone=auto"

        # Send a GET request to the Open Meteo API
        response = requests.get(api_url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            data = response.json()

            # Print the response content to the console
            print(data)

            # Return the response as JSON
            return jsonify(data)
        else:
            # If the request failed, return an error message
            return jsonify({"error": "Failed to fetch data from the API"}), 500
    except Exception as e:
        # Handle exceptions, e.g., network errors
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
