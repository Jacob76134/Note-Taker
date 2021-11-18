const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express()
// const port = 3001
const port = process.env.PORT || 3001

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Note taker listening at http://localhost:${port}`)
})

// let notes = {
//     notes: [
//             {
//                 id: 'abc',
//                 title: 'title',
//                 text: 'this is the body'
//             },
//         ]
// };

// let notes = fs.readFileSync('./db/db.json');
let notes = require('./db/db.json');

// GET
app.get('/api/notes', function(req, res){
    res.json(notes);
});

// POST
app.post('/api/notes', function(req, res){
    //Check if all fields are provided and are valid:

    // if(!req.body.title || !req.body.text){
    if(false){ // Change this later
        res.status(400);
        res.json({message: "Bad Request"});

    } else {
    //    var newId = notes.notes[notes.notes.length-1].id+1;
        var newId = Math.floor(Math.random() * 10000);
        notes.push({
            id: newId,
            title: req.body.title,
            text: req.body.text,
        });
        // res.json({message: "New movie created.", location: "/movies/" + newId});
        res.json(notes);
    }
 });
 
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    });

    // Display index.html when all other routes are accessed
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    });


// let data = JSON.stringify(student, null, 2);

// fs.writeFile('student-3.json', data, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

// console.log('This is after the write call');