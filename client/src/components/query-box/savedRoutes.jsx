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
      show: "",
      res: null
    }
    this.onPlaneChange = this.onPlaneChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
      console.log("GOT user name", this.props.user);
      this.getSavedRoutes();
  }

  async getSavedRoutes() {
    let request = GCP_ENDPOINT + `/query/get_saved_routes?user_id=${this.props.user}`;
    axios.get(request)
      .then(res => {
        console.log("res routes: ", res.data)
        this.setState({ res: res.data, show: ""})
      })
      .catch(err => console.log(err))
  }

  async onButtonClick(e) {
    //execute the query with the given input data
    this.setState({
        show: "loading..."
    })

    let request = GCP_ENDPOINT + `/query/get_favourite_routes?user_id=${this.props.user}`;
    axios.get(request)
      .then(res => {
        console.log("res routes: ", res.data)
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
        <div className="input-title">Saved Routes</div>
        <div className="inputBtn"> 
          <button className="resultBtn" onClick={this.onButtonClick} > Update Saved Routes! </button>
        </div>
        <div className="response-div">
            {resultComp}
        </div>
      </div>
    )
  }
}

export default PlaneModelInfoQuery;