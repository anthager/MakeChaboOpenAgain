# Opens the door to Chabo

To try it out, please use the [staging version](https://staging.open.anton.pizza) and the [staging api](https://staging.api.open.anton.pizza/unlock). Aptus might know their shit and since it uses my credentials and I dont want to get in trouble with CSB for excessive use hehe
<br>
The main application can be visited at https://open.anton.pizza and the api can be found at https://api.open.anton.pizza/unlock
<br>
This will work with other CSB doors as well. Right now it's is hard coded for the A door since only losers live in B or anywhere else
<br>

### Use the script for opening the door:

- Provice the following environment variables: 
  - `CSB_URL=https://www.chalmersstudentbostader.se`
  - `APTUS_URL=https://apt-www.chalmersstudentbostader.se`
  - `LOG=<your personal number>`, 
  - `PASSWORD=<your password to CSB>`
- Run `CSB_URL=https://www.chalmersstudentbostader.se APTUS_URL=https://apt-www.chalmersstudentbostader.se LOG=<your password to CSB> PASSWORD=<your password to CSB> node -e "require('alohomora/src/services/unlock.service.js').unlockDoor()"`

## Frontend

The frontend application uses React and can be found in frontend/.

## Infra

Everything is hosted on a GCE server with traefik as edge router and Circle Ci to do all the sweet CI/CD.

Pr's welcome