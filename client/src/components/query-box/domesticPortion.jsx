import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './querybox.css';
import Select from 'react-dropdown-select';
import OutputTable from '../table/output-table';

const GCP_ENDPOINT = 'process.env.gcp';

class DomesticPortionQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: "",
      country: "",
      airportList: [],
      res: null,
      show: ""
    }
    this.onAirportChange = this.onAirportChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onAiportClick = this.onAiportClick.bind(this);
    this.onCountryClick = this.onCountryClick.bind(this);
  }

  componentDidMount() {
    //get the list of all countries to show when users want to query
  }

  async onAirportChange(e) {
    this.setState({ airport: e[0].id })
  }
  async onCountryChange(e) {
    //get new countries
    let country_i = e[0].id;
    axios.get(GCP_ENDPOINT + `/query/get_airports_in_country?country_iso=${country_i}`)
      .then (res => {
        console.log("airports: ", res);
        this.setState({ country: country_i, airportList: res.data});
      })
  }

  async onAiportClick(e) {
    this.setState({
        show: "loading..."
    })
    let req1 = GCP_ENDPOINT + `/query/domestic_travel_by_airport?airport_id=${this.state.airport}`;
    axios.get(req1)
      .then(res => {
        console.log("res airport: ", res)
        this.setState({ res: res.data, show: ""})
      })
      .catch(err => console.log(err))
  }

  async onCountryClick(e) {
    this.setState({
        show: "loading..."
    })
    let req1 = GCP_ENDPOINT + `/query/domestic_travel?country_id=${this.state.country}`;
    axios.get(req1)
      .then(res => {
        console.log("res country: ", res);
        this.setState({ res: res.data, show: ""})
      })
      .catch(err => console.log(err))
  }

  render() {
    //only show airports when country selected
    let AirportComponent = (this.state.country)
    ? <Select onChange={this.onAirportChange} options={this.state.airportList} placeholder="Airport"/> 
    : null;

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
        <div className="input-title">Fraction of Domestic vs. International Travel</div>
        <div className="description">Given a country or airport, what percentage of the flights to/from that location are domestic?</div>
        <div className="outer">
          <div className="double-input-box">
            <form noValidate>
              <Select onChange={this.onCountryChange} options={this.props.countries} placeholder="Country"/>
              {AirportComponent}
              {/* <TextField className="input-box" id="airport" label="airport" onChange={this.onAirportChange}/> */}
              {/* <TextField className="input-box" id="country" label="country" onChange={this.onCountryChange}/> */}
            </form>
          </div>
          <div className="double-input-box">
              <button className="resultBtn" onClick={this.onAiportClick} > Go by Airport! </button>
              <button className="resultBtn" onClick={this.onCountryClick} > Go by Country! </button>
          </div>
          
          <div className="response-div">
              {resultComp}
          </div>
        </div>
      </div>
    )
  }
}

export default DomesticPortionQuery;
