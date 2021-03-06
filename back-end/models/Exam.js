const mongoose = require("mongoose");

const questionForExamTaken = {
    question: { 
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        questionItself: {
            type: String,
            required: true
        }
    },
    answer: {
        type: String,
        required: true
    },
    rightAnswer: {
        type: String,
        required: true
    }
}

const examTaken = {
    questions: [questionForExamTaken],
    correctAnswers: {
        type: Number,
        required: true
    },
    totalNumberOfQuestions: {
        type: Number,
        required: true
    },
    takenBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    }
}

const schema = new mongoose.Schema({
    isRandom: {
        type: String,
        required: true
    },
    personalFor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numberOfQuestionsIfRandom: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    category: String,
    examsTaken: [examTaken]
});

const model = new mongoose.model("Exam", schema);
module.exports = model;
