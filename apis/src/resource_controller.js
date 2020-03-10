const mongoose = require('mongoose')

const Note = require('../models/note').Note
const User = require('../models/user').User;



//Create subject
const CreateSubject = async(username, subject_name)=>{
    User.updateOne(
        {username:username}, 
        { $push: { subjects: {SubjectName:subject_name} } },
    )
    .then(console.log("User updated"));
}

//Create topic
const CreateTopic = (username, subject, name)=>{
    const topic = new topic({
        TopicName:name
    })
    //Not finished
    username.findById(username)
    Subject.update(
        { SubjectName: subject }, 
        { $push: { Topics: topic } },
        done
    );
}
//Create note
const CreateNote = (title, body)=>{
    const note = new Note({
        title,
        body
    })
}
//Create flashcards
const CreateFlashcard = (subject, title, cards)=>{
    //Convert cards into objects
    const Cards = [cards.length]
    for (let i = 0; i < cards.length; i++) {
        Cards[i] = new Card({})
    }
    //Create flashcards
    //Append flashcards onto existing list
    Subject.findByIdAndUpdate()
}
//Create questions  
const CreateQuestions = (note, questions)=>{

}

//Create a note
const StoreNote = (title, body)=>{
    const note = new Note({
        title,
        body,
    })

    //Save the note to the db
    console.log("ABout to save note")
    note.save()
    .then(()=> console.log("Note saved"))
    .catch((err)=>{throw new Error(err);})
}

module.exports= {StoreNote, CreateSubject}