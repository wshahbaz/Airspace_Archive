import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import OutputTable from '../table/output-table';

const GCP_ENDPOINT = 'process.env.gcp';

class HighTrafficQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latutude: "",
      res: null,
      show: ""
    }
    this.onLatChange = this.onLatChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async onLatChange(e) {
    this.setState({ latitude: e.target.value })
  }

  async onButtonClick(e) {
    //execute the query with the given input data
    this.setState({
        show: "loading..."
    })

    let request = GCP_ENDPOINT + `/query/crossing_latitude?latitude=${this.state.latitude}`
    axios.get(request)
        .then((res) => {
            console.log("ReS: ", res);
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
        <div className="input-title">High Traffic Areas</div>
        <div className="description">Given a line of latitude, what are the flights that fly over that line?</div>
        <div className="double-input-box">
          <form noValidate>
            <TextField id="latitude" label="latitude" onChange={this.onLatChange}/>
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

export default HighTrafficQuery;
