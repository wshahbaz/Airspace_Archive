import React from 'react';
import Button from 'react-bootstrap/Button';
import GameView from '../game-view/gameView';
import axios from 'axios';
import '../../default-view/defaultView.css';

const GCP_ENDPOINT = 'process.env.gcp';

class GameMenuView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCountry: false,
            isAirport: false,
            isAirline: false,
            isLoading: false,

            questions: null,
            gameType: ""
        };

        this.setCountryGame = this.setCountryGame.bind(this);
        this.setAirportGame = this.setAirportGame.bind(this);
        this.setAirlineGame = this.setAirlineGame.bind(this);
    }

    async setCountryGame() { 
        this.setState({ isLoading: true });
        //preprocess quiz data
        let questions = [];
        //get countries
        for (let j = 0; j < 5; j++) {
            let nextQ = await buildCountryQuestion();
            questions.push(nextQ);
        }
        console.log("QUESTIONS: ", questions);
    
        this.setState({ isCountry: true, gameType: "COUNTRY", questions: questions, isLoading: false });
    }
    async setAirportGame() { this.setState({ isAirport: true, gameType: "AIRPORT" })}
    async setAirlineGame() { this.setState({ isAirline: true, gameType: "AIRLINE" })}

    render() {
        //check if game being played... otherwise load buttons
        let game = null;
        if (!this.state.isLoading && (this.state.isCountry || this.state.isAirline || this.state.isAirport) ) {
            return <GameView gameType={this.state.gameType} questions={this.state.questions} user={this.props.user}/>
        }

        return (
            <div className="defaultView background">
                <div className="top-container"> </div>
                <div className="menu-container">
                    <Button id="menuOptions" variant="primary" onClick={this.setCountryGame}> Country Game </Button>
                    <Button id="menuOptions" variant="primary" onClick={this.setAirportGame}> Airport Game </Button>
                    <Button id="menuOptions" variant="primary" onClick={this.setAirlineGame}> Airline Game </Button>
                </div>
            </div>    
        )
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function buildCountryQuestion() {
    let answers;
    try {
        let goodData = false;
        while (!goodData) {
            let countries = await (await axios.get(GCP_ENDPOINT + '/query/random_country?limit=5')).data;
            let coverage = await axios.get(GCP_ENDPOINT + `/query/flight_coverage?country_id=${countries[0].ISO_A2}`);
            let domestic = await axios.get(GCP_ENDPOINT + `/query/domestic_travel?country_id=${countries[0].ISO_A2}`);
            // let top5countries = await axios.get(GCP_ENDPOINT + `/query/popular_country?country_id=${countries[0].ISO_A2}&limit=5`);
            if (coverage.data.length > 0 
                && domestic.data.length > 0
                //  && top5countries.data.length > 0
                 ) {
                goodData = true;
                answers = countries;
                answers[0].coverage = coverage.data[0];
                answers[0].domestic = domestic.data[0];
                // answers[0].top5countries = top5countries.data;
                answers[0].type = "correct";
            } else {
                console.log("coverage at 0: ", coverage);
                console.log("domestic at 0: ", domestic);
                // console.log("top5countries at 0: ", top5countries);
                console.log("have to retry");
            }
        }
        console.log("questions: ", answers);
        //get domestiv/international travel
        let question = `Which country has average coverage of ${+answers[0].coverage.avg_dist.toFixed(2)} km \n whose domestic travel fraction is ${answers[0].domestic.percent_domestic}%`
        answers.forEach(q => {
            q.content = q.name; 
            if (!q.type) q.type = "fail"
        });
        return {
            question: question,
            answers: shuffle(answers)
        }
    } catch (err) {
        console.error(err);
    }
}

export default GameMenuView;