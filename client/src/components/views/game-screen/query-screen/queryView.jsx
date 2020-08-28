import React from 'react'
import DomesticPortionQuery from '../../../query-box/domesticPortion';
import MostPopularVisitsQuery from '../../../query-box/mostPopularVisits';
import PlaneInfoQueryQuery from '../../../query-box/planeModelInfo';
import NearestAirportQuery from '../../../query-box/nearestAirport';
import ShortestFlightQuery from '../../../query-box/shortestFlight';
import FlightCoverageQuery from '../../../query-box/flightCoverage';
import HighTrafficQuery from '../../../query-box/highTraffic';
import FavouriteRoutes from '../../../query-box/favouriteRoutes';
import axios from 'axios';
import './queryView.css';

const GCP_ENDPOINT = 'process.env.gcp';

class QueryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    


    render() {
        return (
            <div>
                <div className="queryDiv">
                    <div className="query-box"> 
                        <DomesticPortionQuery countries={this.props.countries} airports={this.props.airports} /> 
                    </div>
                    <div className="query-box"> 
                        <MostPopularVisitsQuery countries={this.props.countries} airports={this.props.airports} /> 
                    </div>
                    <div className="query-box"> 
                        <PlaneInfoQueryQuery planes={this.props.airplanes}/> 
                    </div>
                </div>
                <div className="queryDiv">
                    <div className="query-box">
                         <NearestAirportQuery /> 
                    </div>
                    <div className="query-box"> 
                        <ShortestFlightQuery user={this.props.user} />
                    </div>
                    <div className="query-box"> 
                        <FlightCoverageQuery countries={this.props.countries} /> 
                    </div>
                </div>
                <div className="queryDiv">
                    <div className="query-box"> <HighTrafficQuery /> </div>
                    <div className="query-box"> <FavouriteRoutes user={this.props.user}  /> </div>
                </div>
            </div>
        )
    }
}

export default QueryView;