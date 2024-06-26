const mongoose = require('mongoose')

const Note = require('../models/note').Note
const User = require('../models/user').User;



//Create subject
const CreateSubject = async(username, subject_name)=>{
    try {
        const queryResult = await User.updateOne(
            {"username":username}, 
            { $push: { subjects: {SubjectName:subject_name} } }
        ).exec();
        return queryResult.nModified;
    } catch (err) {
        console.log("There was an error tryng to create a subject.\n" + err)
    }
    //console.log("Completing updating user: " + JSON.stringify(user));
}

//Create topic
const CreateTopic = async(username, subject, name)=>{
    try{
        const queryResponse = await User.updateOne(
            {"username":username},
            {$push: {'subjects.$[element].Topics': {'TopicName': name}}},
            { arrayFilters: [{ 'element.SubjectName': subject }] }
        ).exec()
        return queryResponse.nModified;
    }catch(err){
        console.log("Error creating topic")
    }
}
//Create note
const CreateNote = (username, topicName,title, body)=>{
    const queryResponse = await User.updateOne(
        {"username":username},
        {$push: {'subjects.Topics.$[element].Notes': {'title': title, 'body':body}}},
        { arrayFilters: [{ 'element.TopicName': topicName }] }
    ).exec()
    console.log(queryResponse)
    return queryResponse.nModified;
}
//Create flashcards
const CreateFlashcard = (username, topicName, title, cards)=>{
    const queryResponse = await User.updateOne(
        {"username":username},
        {$push: {'subjects.Topics.$[element].Flashcards': {'title': title, 'cards':cards}}},
        { arrayFilters: [{ 'element.TopicName': topicName }] }
    ).exec()
    console.log(queryResponse)
    return queryResponse.nModified;
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

module.exports= {CreateSubject, CreateTopic, CreateNote, CreateFlashcard}