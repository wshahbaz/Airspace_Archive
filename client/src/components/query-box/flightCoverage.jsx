import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import OutputTable from '../table/output-table';
import Select from 'react-dropdown-select';

const GCP_ENDPOINT = 'process.env.gcp';

class FlightCoverageQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      res: null,
      show: ""
    }
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async onCountryChange(e) {
    this.setState({ country: e[0].id })
  }

  async onButtonClick(e) {
    //execute the query with the given input data
    this.setState({
        show: "loading..."
    })

    let request = GCP_ENDPOINT + `/query/flight_coverage?country_id=${this.state.country}`
    let response = axios.get(request)
        .then((res) => this.setState({res: res.data, show: ""}))
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
        <div className="input-title">Flight Coverage</div>
        <div className="description">If you were randomly dropped in a given country, on average how far away would you be to the nearest airport?</div>
        <div className="double-input-box">
          <form noValidate>
          <Select onChange={this.onCountryChange} options={this.props.countries} placeholder="Country"/>
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

export default FlightCoverageQuery;
