const express = require('express');
const questionList = require('./questions.json');
const app = express();
//starts the static html for node.js
app.use(express.static('static'));
app.get('/JsonQuestions', function(req,res){
    let QAns = JSON.parse(JSON.stringify(questionList));
    //for loop for the liost of questions 
    for(i in QAns){
        delete QAns[i].answerIndex;
    }
    res.json(QAns); 
})
//gets the json answers to see if the user input is correct or incorrect
app.get('/JsonAnswers', function(req,res){
    //initialize variables
    let QueIndex = req.query.q;
    let AnsIndex = req.query.a;
    let results = "";
    let question = questionList[QueIndex];
    //if statements to display the matching result based on the user's input
    if(question.answerIndex == AnsIndex){
        results = "Correct! " + QueIndex;
    }
    else{
        results = "TryAgain! " + QueIndex;
    }
    res.send(results);
})
//assume port 80 like in previous labs
app.listen(80);