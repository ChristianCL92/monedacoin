To run this project follow the commands.

1. clone the project
2. npm install (both on backend and frontend folder)
3. Set up pubnub account/get pubnub keysets
   . Publish key
   . Subscribe key
   . Secret key
   . User-id : You decide the input for the id.
4. Save the data from 3) inside the config folder, in a .env file. (backend)
5. add your MONGO_URI to the .env file.
6. Add the following environmental variables to your .env file:
   - JWT_SECRET
   - JWT_TTL
   - JWT_COOKIE_TTL

   example
   - JWT_SECRET=your_jwt_secret_key
   - JWT_TTL=90d
   - JWT_COOKIE_TTL=90
  
   
   
   
   
 
