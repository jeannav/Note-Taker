const router = require('express').Router()
const path = require('path')
const db = require('../db/db.json')
const fs = require('fs')

// GET route for displaying index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

// GET route for displaying notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// GET route to get /api/notes - grabs the db file and reads from it
router.get("/api/notes", (req, res) => {
    res.json(db)
})


// POST route to create a note
router.post("/api/notes", (req, res) => {
    const createdNote = createNote(req.body, db);
    res.json(createdNote)
});

const createNote = (body, currentNotes) => {
    if(!currentNotes) {
        currentNotes = []
    }
    body.id = currentNotes.length + 1;
    currentNotes.push(body)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(currentNotes)
    )
    return body
}

// DELETE route for deleteing note
router.delete("/api/notes/:id", (req, res) => {
    deleteNote(req.params.id, db)
    res.json(true)
})

const deleteNote = (noteId, currentNotes) => {
    for(let i = 0; i < currentNotes.length; i++) {
        let index = currentNotes[i]
        if(index.id == noteId) {
            currentNotes.splice(i, 1)
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(currentNotes)
            );
            break;
        }
    }
}

module.exports = router;