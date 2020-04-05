const mongoose = require('mongoose')
const UserController = require('./user_controller')

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
//Get subjects
const GetSubjects = async(username, amount = -1)=>{
    const user = await UserController.getUser(username)
    if(amount != -1){
        if(amount < user.subjects.length){
            return user.subjects.slice(0,amount)
        }
    }
    return user.subjects
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

//Get topic
const GetTopic = async(username, subjectName, topicName)=>{
    const user = await UserController.getUser(username)
    if(user){
        user.subjects.forEach(subject => {
            if(subject.SubjectName == subjectName){
                subject.Topics.forEach(topic => {
                    if(topic.TopicName == topicName){
                        return topic
                    }
                });
            }
        });
    }
}

const GetTopics = async(username, amount)=>{
    try{
        let topics = []
        const user = await UserController.getUser(username)
        console.log("Got user")
        //console.log(user)
        if(user){
            for (let i = 0; i < user.subjects.length; i++) {
                console.log(`Subject ${i}/${user.subjects.length}`)
                //console.log("topics: " + user.subjects[0].Topics[0])
                for (let t = 0; t < user.subjects[i].Topics.length; t++) {
                    //console.log("Topic name: " + user.subjects[i].Topics[t])
                    topics.push(user.subjects[i].Topics[t])
                    if(topics.length == amount){
                        return topics
                    }
                }
            }
            return topics
        }
    }catch(error){
        console.log("Error in GetTopic")
        console.log("Error: " + error)
    }
}

//Create note
const CreateNote = async(username, topicName,title, body)=>{
    const queryResponse = await User.updateOne(
        {"username":username},
        {$push: {'subjects.Topics.$[element].Notes': {'title': title, 'body':body}}},
        { arrayFilters: [{ 'element.TopicName': topicName }] }
    ).exec()
    console.log(queryResponse)
    return queryResponse.nModified;
}
//Create flashcards
const CreateFlashcard = async(username, topicName, title, cards)=>{
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

module.exports= {CreateSubject, CreateTopic, CreateNote, CreateFlashcard, GetTopic, GetTopics, GetSubjects}