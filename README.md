# Custos-Client
This is a test client for the [Apache Software Foundation's Custos authentication application](https://airavata.apache.org/custos/). It uses group-based authorization to manage access to portions of the application.

The 'dummy data' that's displayed is inspired by the data from [a Digital Ocean article](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react). Please note that the main focus of this project is showcasing the login process with Custos, the PKCE code challenge creation, and how tokens can have different scopes that allow certain users to have more privileges.

## Important Notes
Within the application, you have the ability to specify the callback url. You can't specify any other url besides `http://localhost:3000/callback` because that's the only page in the frontend that can handle it. Also, if you want to run the backend on a different port, make sure to modify the proxy configuration within frontend/package.json.

## Getting started
To run the backend, navigate into the backend1 folder and type in `python manage.py runserver`. The backend is Django (runs on port 8000 by default), and the frontend is React (runs on port 3000 by default). To run the frontend, navigate into the frontend folder and type in `npm start`. Go to [localhost:3000](http://localhost:3000), enter in the client ID that corresponds to my (Pranav's) group and keep the redirect url unchanged. Sign in, and you should see your name and email.

## Backend dependencies
Run `pip install -r requirements.txt` to install the required packages.

## Frontend dependenices
Navigate to the frontend folder, and run `npm install` to install the required node modules.

## API endpoints used
- `api/v1/identity-management/token` to get the token after exchanging the code from the code challenge
- `api/v1/user-management/userinfo` to get user info (including name, username, and groups)
- `api/v1/group-management/groups/{groupId}/members` to add the user to the admin group
- `api/v1/group-management/groups/admin/members/{userId}` to delete the user from the group

## gRPC Features and User Management
You can use gRPCs for user management by navigating to:http://localhost:3000/userProfileForm

Setup Instructions for gRPC and Backend Servers:

1.) Start the Express Proxy Server
In a new terminal tab or window, run:

`node Custos-Client/frontend/src/proxyServer.js`

2.) Start the gRPC Server and Django Server
In another terminal tab or window, run:

`python Custos-Client/backend1/backend1/proto/server.py`

Verifying User Creation:
- Open the Network Tab in your browser's Developer Tools (Inspect Element).
- Look for relevant gRPC requests and their responses.

## Proxy Server Endpoints
- `/createUserProfile`
- `/createGroup`
- `/deleteGroup`
- `/getAllGroups`

