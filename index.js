
  const express = require('express');
  const path = require('path');

  const PORT = 80;
  const INDEX = path.join(__dirname, 'index.html');

  const server = express()
    .use((req, res) => res.sendFile(INDEX)  )
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
