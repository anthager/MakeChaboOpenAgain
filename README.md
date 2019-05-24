# Opens the door to Chabo
The main application is can be visited at [https://open.anton.pizza](https://open.anton.pizza) and the api can be found at [https://openapi.anton.pizza/unlock-door](https://openapi.anton.pizza/unlock-door).
<br>
If you want to try it out, please use the [staging version](https://staging-open.anton.pizza) and the [staging api](https://stagingopenapi.anton.pizza/unlock-door) instead. Aptus might know their shit and since it uses my credentials and I dont want to get in trouble with CSB for excessive use hehe
<br>
This will work with other CSB doors as well. Right now it's is hard coded for the A door since only losers live in B
<br>

## Use the code for opening the door:

- place your credentials in a file `src/secrets.js` and export as `pw` and `log`
- call `unlockDoor()` in serverless/src/unlock/unlock.js

`./server` is for testing what the http-calls look like, probably a good idea to use as similar http-headers as the original requests as possible. Aspus might know their shit

# Frontend
The frontend application is written in React and can be found in frontend/
<br>
Right now the frontend is hosted at a server with nginx and the config can be found in nginx-conf/

# Api
The api takes a query string parameter doorID which now can only be 116402 for the A door and 116400 for the B door. Default is the A door