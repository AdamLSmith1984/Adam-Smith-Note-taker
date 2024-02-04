const router = require('express').Router();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const notesDBPath = path.join(__dirname, "../db/db.json");

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);
});

router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});
router.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const json = JSON.parse(fs.readFileSync(notesDBPath));
    const result = json.filter((note) => note.id !== noteId);
    fs.writeFileSync(notesDBPath, JSON.stringify(result));
    res.json(`Item ${noteId} has been deleted.`);
  });

module.exports = router;