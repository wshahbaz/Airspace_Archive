import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './querybox.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import OutputTable from '../table/output-table';
import SavingTable from '../table/saving-table';

const GCP_ENDPOINT = 'process.env.gcp';

class ShortestFlightQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: "",
      source: "",
      limit: 100,
      res: null,
      show: ""
    }
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.onDistanceClick = this.onDistanceClick.bind(this);
  }

  componentDidMount() {
    //get the list of all countries to show when users want to query
  }

  async onDistanceChange(e) {
    this.setState({ distance: e.target.value })
  }

  async onSourceChange(e) {
    this.setState({ source: e.target.value.toUpperCase() });
  }


  async onDistanceClick(e) {
    //execute the query with the given input data
    this.setState({ show: "loading..." })

    let req = GCP_ENDPOINT + `/query/short_flights?src_airport=${this.state.source}&distance=${this.state.distance}&limit=${this.state.limit}`
    await axios.get(req)
      .then((res) => {
        console.log("RES: ", res);
        this.setState({res: res.data, show: ""});
      })
      .catch((err) => this.setState({show: "no results found :("}))
  }


  render() {
    
    let resultComp;
    if (this.state.show) {
      resultComp = this.state.show;
    } else if (this.state.res) {
      resultComp = <SavingTable data={this.state.res} user={this.props.user}/>
    } else {
      resultComp = null;
    }

    return (
      <div className="queryComp">
        <div className="input-title">Flight Finder</div>
        <div className="description">Given a an airport and a maximum travel distance, where can you go?</div>
        <div className="outer">
          <div className="double-input-box">
            <form noValidate>
              <TextField className="input-box" id="source" label="source airport (AAA)" onChange={this.onSourceChange}/>
            </form>
          </div>
          <div className="double-input-box">
            <form noValidate>
              <TextField className="input-box" id="distance" label="minimum distance" onChange={this.onDistanceChange}/>
            </form>
          </div>
          <div className="double-input-box"> 
            <button className="resultBtn" onClick={this.onDistanceClick} > Go Distance! </button>
          </div>
          <div className="response-div">
              {resultComp}
          </div>
        </div>
      </div>
    )
  }
}

export default ShortestFlightQuery;
