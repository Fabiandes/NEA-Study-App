const mongoose = require('mongoose')

const Note = require('../models/note').Note
const Subject = require('../models/subject').Subject;
const User = require('../models/user').User;

const Flashcard = require('../models/cardset').Flashcard
const cardSchema = require('../models/cardset').CardSchema
const DBUSERNAME = process.env.db_username || 'test-user';
const DBPASSWORD = process.env.password || 'dW1JJglBFeca4R3T';
const DBURI = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@studyapp-kyldd.mongodb.net/test?retryWrites=true&w=majority`

try {
    mongoose.connect(DBURI, {useNewUrlParser: true});
} catch (error) {
    console.log("Error connecting to db")
}

//Create subject
const CreateSubject = (username, subject_name)=>{
    const subject = new Subject({SubjectName:subject_name})
    console.log("Subject object created")
    User.findOneAndUpdate({username:username},{ $push: { subjects: subject } })
    console.log("DB updated")
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