var fs = require('fs');

fs.readdir('./assets', (err, data) => {
    if (err) console.log(err);
    console.log(data);
})