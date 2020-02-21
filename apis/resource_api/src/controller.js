const Note = require('../models/note').Note
const Flashcard = require('../models/flashcard').Flashcard
const cardSchema = require('../models/flashcard').CardSchema

//Create a note
const StoreNote = (title, body)=>{
    const note = new Note({
        title,
        body,
    })

    //Save the note to the db
    note.save()
    .catch((err)=>{throw new Error(err);})
}