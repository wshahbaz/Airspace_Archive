import React from 'react';
import TextField from '@material-ui/core/TextField';
import './querybox.css';
import axios from 'axios';
import Select from 'react-dropdown-select';
import OutputTable from '../table/output-table';

const GCP_ENDPOINT = 'process.env.gcp';

class PlaneModelInfoQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plane: "",
      res: null,
      show: ""
    }
    this.onPlaneChange = this.onPlaneChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async onPlaneChange(e) {
    this.setState({ plane: e[0].airplane  })
  }

  async onButtonClick(e) {
    //execute the query with the given input data
    this.setState({
        show: "loading..."
    })

    let request = GCP_ENDPOINT + `/query/get_airlines_by_airplane?airplane_name=${this.state.plane}`
    axios.get(request)
      .then(res => {
        console.log("res airlines: ", res.data)
        this.setState({ res: res.data, show: ""})
      })
      .catch(err => console.log(err))
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
        <div className="input-title">Plane Model Information</div>
        <div className="description">Given an aircraft type, what airlines fly that plane the most?</div>
        <div className="double-input-box">
          <form noValidate>
          <Select style={{zIndex: 999}} id="selector" onChange={this.onPlaneChange} options={this.props.planes} placeholder="Airplane Model"/> 
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

export default PlaneModelInfoQuery;
