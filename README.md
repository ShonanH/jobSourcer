# Shonan Hendre

# Jan 7 2021

# Pathrise Job Resolver

# This Job Resolver application is created with server side and client side code bases. The server is hosted on heroku (refer server/config.js for login details) and the client is hosted on Netlify.

# The backend is built using Node.js + Express.js with a MySql database. Additional dependencies installed are: body-parser, cors, csvtojson, express, mysql2, nodemon.

# The frontend is built using React.js (create-react-app) with additional dependencies such as axios and react-router-dom

# Backend

# NOTE: use config.js file to view the database credentials

# First, the csv file is imported into the MySql database in the 'mysql_code/initialize.js' file. Here the mysql database is populated with the values in their respective columns in the csv file using the CREATE TABLE and INSERT queries paired with looping through csv file. I added the JobSource column here and initialized it to Null in the beginning.

# Second, this newly formed database table 'samples' and the job_boards.json file is looped through and checked for the various different conditions in the 'mysql_code/simple_queries.js' file. Here instead of using an array to store the values, I decided to use a dictionary (hash table) in order to minimize lookup time from O(N) = N being the length of the array => O(1) aka Constant Time.

# And Finally, the file which runs in order for the client to fetch the data from the heroku hosted mysql database is index.js. Here a simple get request is made everytime the user clicks on a job card which then fetches the Company Name and queries the database for the appropriate data. Initially, the get request used to query the entire database everytime the user clicked on a job card. Since the free version of ClearDBMySql on Heroku only allows 3600 queries per hour, I was having trouble with latency in fetching the data again and again. This was mitigated by adding request params and querying ONLY the data which corresponds with the company Name in the Job Source column, which makes the data fetch much faster and efficient.

# Frontend

# As mentioned before, the frontend is built using React.js.

# In App.js, the job_boards.json file is parsed to create the Job Cards => please refer to components/Card.js for implementation of A job card. On clicking any job card, the user is redirected to /details page which shows the tabular data for the respective Job Card. This is done in the components/CardStats.js file where we import axios and make a get request to the heroku database url and add the companyName as a parameter such that the backend can fetch this parameter and return data appropriately.
