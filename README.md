## Steps to run

prerequisites: 
- you will need node, npm, and mongo installed on your machine
- you will need a collection in your local mongo db named "liveControlTest" (https://docs.mongodb.com/manual/reference/method/db.createCollection/)
 
open your terminal to the folder you'd like to download the app into

```
git clone https://github.com/karina-y/livecontrol.git
cd livecontrol/client && npm i
npm start
```

now open a second terminal and cd into the api directory
```
npm i
npm start
```

to view the client go to http://localhost:3000 in your browser

to upload a video open a third terminal and cd into the api directory
```
node upload.js /path/to/video.mp4 'title here'
```
