# Opens the door to Chabo

may work with other CSB doors as well. Right now its is hard coded for the A door since only losers live in B
<br>

# To unlock the door:

- place your credentials in a file `src/secrets.js` and export as `pw` and `log`
- call `unlockDoor()` in src/index.js

<br>

Might be a good idea to use process.env instead of static js-file

<br>

`./server` is for testing what the http-calls look like, probably a good idea to use as similar http-headers as the original requests as possible. Aspus might know their shit
