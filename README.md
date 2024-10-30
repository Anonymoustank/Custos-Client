# Custos-Client
This is a test client for the [Custos authenticationa application](https://airavata.apache.org/custos/). To run the frontend, navigate into the frontend folder and type in `npm start`. To run the backend, navigate into the backend1 folder and type in `python manage.py runserver`. The backend is Django (runs on port 8000 by default), and the frontend is React (runs on port 3000 by default).

The 'dummy data' that's displayed when you logged in is taken from [the Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react).

## Important Notes
Within the application, you have the ability to specify the callback url. You can't specify any other url besides `http://localhost:3000/callback` because that's the only page in the frontend that can handle it. Also, if you want to run the backend on a different port, make sure to modify the proxy configuration within frontend/package.json.

## Backend dependencies
Run `pip install -r requirements.txt` to install the required packages.

## Frontend dependenices
Navigate to the frontend folder, and run `npm install` to install the required node modules.