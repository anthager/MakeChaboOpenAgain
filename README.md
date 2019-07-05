# Opens the door to Chabo

If you want to try it out, please use the [staging version](https://staging-open.anton.pizza) and the [staging api](https://stagingopenapi.anton.pizza/unlock-door) instead. Aptus might know their shit and since it uses my credentials and I dont want to get in trouble with CSB for excessive use hehe
<br>
The main application is can be visited at https://open.anton.pizza and the api can be found at https://openapi.anton.pizza/unlock-door, the api url will probably change in the near future.
<br>
This will work with other CSB doors as well. Right now it's is hard coded for the A door since only losers live in B or anywhere else
<br>

### Use the script for opening the door:

- place your credentials in a file `src/secrets.js` and export as `pw` and `log`
- call `unlockDoor()` in serverless/src/unlock/unlock.js

## Frontend

The frontend application is written in React and can be found in frontend/.
Right now the frontend is hosted at a server with nginx and the config can be found in nginx-conf/

## Future shit

Since I dont really find serverless cool and want to go more basic I'm rewriting the application in the `backend-rebuild` branch. Watch out if you go there, the folder structure is the wild west.
