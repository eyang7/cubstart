const express = require('express');
const cors = require('cors');
const path = require('path');
const thumbsupply = require('thumbsupply');
const fs = require('fs');

const videosMetadata = [
  {
      id: 'fire',
      thumbnail: '/video/fire/thumbnail',
      description: 'Fire is hot.',
      name: 'Fire'
  },
  {
      id: 'ocean',
      thumbnail: '/video/ocean/thumbnail',
      description: 'Ocean is large.',
      name: 'Ocean'
  },
  {
      id: 'sky',
      thumbnail: '/video/sky/thumbnail',
      description: 'Sky is blue.',
      name: 'Sky'
  },
];

const app = express();

app.use(cors());

// QUESTION 1
// want to return JSON response of videos MetaData array
app.get('/videos', (req, res) => {
    res.send(videosMetadata); 
});

app.get('/video/:id', (req, res) => { //request object
  // QUESTION 3
  const path = './assets/' + req.params.id + '.mp4'; //find the path of the id given
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1;
      const chunksize = (end-start) + 1;
      const file = fs.createReadStream(path, {start, end});
      const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
  } else {
      const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
  }
});

// QUESTION 4
// REPLACE WITH YOUR CODE
app.get('/video/:id/data', (req, res) => {
    //find & return the metadata that corresponds to the id
    var result = videosMetadata.filter(obj => {
        return obj.id == req.params.id; 
    })
    return result;  
}); 

// QUESTION 7
app.get('/video/:id/thumbnail', (req, res) => {
    
    //find and set the thumbanails to corresponding req.id
    thumbsupply.generateThumbnail('./assets/' + req.params.id + '.mp4').then(response =>
        res.sendFile(response)); 
}); 

app.listen(4000, () => {
  console.log('Listening on port 4000!');
});
