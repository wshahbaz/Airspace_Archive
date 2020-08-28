import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Quiz from '../../../question-mc/quiz.jsx';
import GameResults from '../gameResults/gameResultsView';
import logo from '../../../../svg/logo.svg';
import { quizQuestions, qTypes } from '../../data/quizQuestions.jsx';
import Result from '../../../question-mc/result.jsx';
import AIRPORT from '../../data/airports';
import COUNTRY from '../../data/countries';

const GCP_ENDPOINT = 'process.env.gcp';

class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //question state
            question: '',
            answerOptions: [],
            //quiz state
            quizQuestions: [],      //stores ALL questions at once.
            questionCounter: 0,
            numCorrect: 0,
            //termination vars
            complete: false,
            result: '',
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.generateQuestions = this.generateQuestions.bind(this);
        this.handleQuizEnd = this.handleQuizEnd.bind(this);
    }

    componentDidMount() {
        //get the new quiz questions
        this.generateQuestions().then(() => {

            this.setState({
                // quizQuestions: shuffledAnswerOptions,
                question: this.state.quizQuestions[0].question,
                answerOptions: this.state.quizQuestions[0].answers
            });
        })
    }

    async generateQuestions() {
        //generate 5 random questions based on our basis of random questions
        let questions = this.props.questions;

        //set state to refresh upon generating random questions
        this.setState({
            quizQuestions: questions
        });
        console.log("QUIZ QUESTIONS: ", questions);
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        console.log("answered questions: ", this.state.questionCounter);
        console.log("number of total questions: ", this.state.quizQuestions.length);
        if (this.state.questionCounter < this.state.quizQuestions.length - 1) {
            setTimeout(() => this.setNextQuestion(), 300);
        }
    }

    setUserAnswer(answer) {
        console.log("set a user answer!", answer);
        let newNumCorrect = (answer == "correct") ? this.state.numCorrect + 1 : this.state.numCorrect;
        let isComplete = this.state.questionCounter === this.state.quizQuestions.length - 1;
        if (isComplete) {
            console.log("YOU GOT this many right: ", newNumCorrect);
            this.handleQuizEnd(newNumCorrect);
        }
        this.setState({
            numCorrect: newNumCorrect,
            complete: isComplete
        });
    }

    setNextQuestion() {
        const counter = this.state.questionCounter + 1;
        this.setState({
            questionCounter: counter,
            question: this.state.quizQuestions[counter].question,
            answerOptions: this.state.quizQuestions[counter].answers,
        });
    }

    async handleQuizEnd(finalScore) {
        //log user score for this game type
        let queryParams = `?name=${this.props.user}&game_id=${this.props.gameType}&score=${finalScore}`
        await axios.get(GCP_ENDPOINT + '/query/insert_user_score' + queryParams);
    }

    renderQuiz() {
        return (
            <Quiz
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionCounter + 1}
                question={this.state.question}
                questionTotal={this.state.quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }


    render() {
        if (this.state.quizQuestions.size === 0) return <div></div>;
        if (this.state.complete) {
            return <GameResults user={this.props.user} userScore={this.state.numCorrect} gameType={this.props.gameType}/>
        }

        return (
            <div className="game">
                <div className="game-header">
                <h2>{this.props.gameType} Quiz</h2>
                </div>
                {this.renderQuiz()}
            </div>
        )
    };
}

export default GameView;