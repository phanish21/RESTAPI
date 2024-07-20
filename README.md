# RESTAPI
Node.js REST API with Geospatial Query
This Node.js application provides a REST API that accepts latitude and longitude as input parameters and returns a sorted list of users within a 10-kilometer radius.

# Features
API Endpoint: /api/users
Calculates distances using the Haversine formula to find users within a 10-kilometer radius.
Pagination: Supports pagination to limit the number of results returned.
Initial Data Population: Automatically populates the database with sample user data on server startup.
# Prerequisites
Node.js (v14 or higher)
MongoDB Atlas or local MongoDB instance
# Setup
1. Clone the Repository
2. Install Dependencies
Make sure you have Node.js installed.
3. Configure Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
PORT=5000

Replace the placeholders with your MongoDB Atlas connection details. If you are using a local MongoDB instance, the MONGO_URI might look like:

MONGO_URI=mongodb://localhost:27017/yourdbname

4. Run the Server
Start the server by running:
You should see output indicating that the server is running and that MongoDB is connected. The server will also populate the database with sample user data.
5. Test the API
You can test the API using tools like Postman or curl.

# Example Request
'http://localhost:5000/api/users?latitude=40.7128&longitude=-74.0060&page=1&limit=10'
API Endpoint
Endpoint: /api/users
Method: GET
Query Parameters:
latitude (required): Latitude of the center point.

longitude (required): Longitude of the center point.

page (optional): Page number for pagination (default is 1).

limit (optional): Number of results per page (default is 10).

# Response
The API returns a JSON response with the following structure:

{
  "users": [// Array of user objects],
  "total": 0,
  "page": 1,
  "limit": 10
}
  
# Error Handling
400 Bad Request: Missing or invalid latitude or longitude.

500 Internal Server Error: Server error.

# Code Structure
server.js: Main server file where the application is initialized.

config/db.js: Database connection configuration.

models/usermodel.js: Mongoose schema and model for users.

routes/userRoutes.js: Defines routes for the user-related endpoints.

middlewares/errorHandler.js: Custom error handling middleware.

# Notes
The server automatically deletes existing user data and repopulates the database with sample data each time it starts. This is intended for development and testing purposes.

For production use, consider implementing a more robust data seeding strategy.
