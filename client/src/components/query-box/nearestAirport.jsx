import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './querybox.css';
import OutputTable from '../table/output-table';

const GCP_ENDPOINT = 'process.env.gcp';

class NearestAirportQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longVal: "",
      latVal: "",
      res: null,
      show: ""
    }
    this.onlongValChange = this.onlongValChange.bind(this);
    this.onlatValChange = this.onlatValChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    //get the list of all countries to show when users want to query
  }

  async onlongValChange(e) {
    this.setState({ longVal: e.target.value })
  }
  async onlatValChange(e) {
    this.setState({ latVal: e.target.value })
  }
  async onButtonClick(e) {
    //execute the query with the given input data
    this.setState({
        show: "loading..."
    })

    let req = GCP_ENDPOINT + `/query/find_nearest_airport?long=${this.state.longVal}&lat=${this.state.latVal}`
    axios.get(req)
      .then((res) => {
        console.log("RES: ", res);
        this.setState({res: res.data, show: ""})
      })
      .catch((err) => this.setState({show: "no results found :("}))
  }

  render() {
    let resultComp;
    if (this.state.show) {
      resultComp = this.state.show;
    } else if (this.state.res) {
      resultComp = <OutputTable data={this.state.res} />
    } else {
      resultComp = null;
    }

    return (
      <div className="queryComp">
        <div className="input-title">Nearest Airport</div>
        <div className="description">Given a point on the globe, what's the nearest airport?</div>
        <div className="double-input-box">
          <form noValidate>
            <TextField className="input-box" id="longVal" label="longitude" onChange={this.onlongValChange}/>
            <TextField className="input-box" id="latVal" label="latitude" onChange={this.onlatValChange}/>
          </form>
        </div>
        <div className="inputBtn"> 
          <button className="resultBtn" onClick={this.onButtonClick} > Go! </button>
        </div>
        <div className="response-div">
            {resultComp}
        </div>
      </div>
    )
  }
}

export default NearestAirportQuery;
