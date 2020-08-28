import React from 'react';
import Button from 'react-bootstrap/Button';
import OutputTable from '../../../table/output-table';
import '../../default-view/defaultView.css';
import Axios from 'axios';
import './gameResultsView.css'

const GCP_ENDPOINT = 'process.env.gcp';

class GameResultsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pastScores: null,
            hiScores: null,

            loaded: false
        };
        this.getScores = this.getScores.bind(this);
    }

    componentDidMount() {
        //get past high scrores and best scores for game type
        this.getScores()
            .then(() => {
                this.setState({loaded: true})
            })
    }

    async getScores() {
        let userHiScores = await Axios.get(GCP_ENDPOINT + `/query/get_user_top_score?uid=${this.props.user}&game_id=${this.props.gameType}`);
        let gameTopScores = await Axios.get(GCP_ENDPOINT + `/query/get_top_score?game_id=${this.props.gameType}`);
        this.setState({
            pastScores: userHiScores.data,
            hiScores: gameTopScores.data
        })
    }

    render() {
        if (!this.state.loaded) return <div></div>

        //print user's score for this run
        //print users scores all time
        //print all time scores
        return (
            <div className="defaultView">
                <div className="top-container"> </div>
                <div className="menu-container">
                    <div className="user-score">
                        <h3> You got a score of {this.props.userScore} on the {this.props.gameType} quiz! Congratulations! </h3>
                    </div>
                    <div className='table-output'>
                        <h3> Your past scores on this quiz: </h3>
                        <OutputTable  data={this.state.pastScores}/>
                    </div>
                    <div className='table-output'>
                        <h3> All time best scores on this quiz: </h3>
                        <OutputTable  data={this.state.hiScores}/>
                    </div>
                </div>
            </div>    
        )
    }
}

export default GameResultsView;