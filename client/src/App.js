import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DoubleInput from './components/input-select/double-input';
import SingleInput from './components/input-select/single-input';
import OutputTable from './components/table/output-table';
import InfoModal from './components/info-modal/modal';
import DomesticPortionQuery from './components/query-box/domesticPortion.jsx';
import DefaultView from './components/views/default-view/defaultView';
import GameMenuView from './components/views/game-screen/gameMenu/gameMenuView';
import QueryView from './components/views/game-screen/query-screen/queryView';
import LoginView from './components/views/login/login';
import Button from 'react-bootstrap/Button';

const GCP_ENDPOINT = 'process.env.gcp';

const const_data = [
  {
    f1: "hi",
    f2: "hello",
    f3: "bonjour"
  },
  {
    f1: "later",
    f2: "bye",
    f3: "aurevious or smth"
  }
]

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isGame: false,
      isQuery: false,

      countries: {},
      airports: {},
      airplanes: {},
      loaded: false,
      user: "",
    };
    this.handleGameView = this.handleGameView.bind(this);
    this.handleQueryView = this.handleQueryView.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.processData = this.processData.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async processData() {
    //get all airport (don't await)
    // let airportsRoute = GCP_ENDPOINT + `/query/get_all_airports`
    // await axios.get(airportsRoute)
    // .then(res => {
    //     console.log("RES1: ", res)
    //     this.setState({ airports: res.data, loaded: true})
    // })
    // .catch(err => console.log(err))

    //get all countries
    let countryRoute = GCP_ENDPOINT + `/query/get_all_countries`
    await axios.get(countryRoute)
    .then(res => {
    //   console.log("RES1: ", res)
        this.setState({ countries: res.data})
    })
    .catch(err => console.log(err))

    //get all airplanes
    let airplanesRoute = GCP_ENDPOINT + `/query/get_all_airplanes`
    await axios.get(airplanesRoute)
    .then(res => {
      console.log("all airplanes: ", res);
      //map airplanes to suitabl id, value map
      res.data.map(d => d.airplane = d.label);
      // console.log('mapped airplanes:', airplanes);
        this.setState({ airplanes: res.data, loaded: true})
    })
    .catch(err => console.log(err))
}

  async login(userName) {
    console.log("username is ", userName);
    this.setState({ isLogin: false, user: userName });
  }

  async logout() {
    console.log("logging out");
    this.setState({ isLogin: true, user: ""})
  }

  componentWillMount() {
    this.setState({ loaded: true})
    // this.processData();
  }

  handleGameView() { this.setState({ isGame: true, isQuery: false }) }
  handleQueryView() { this.setState({ isGame: false, isQuery: true }) }
  handleBackClick() { this.setState({ isGame: false, isQuery: false }) }
  
  render() {
    //determine which view to display
    let view;
    let backButton = null;
    if (this.state.isLogin) {
      console.log("display login");
      view = < LoginView login={this.login}/>
    } else if (this.state.isGame) {
      view = <GameMenuView user={this.state.user}/>
      backButton = <Button className="backBtn" variant="primary" onClick={this.handleBackClick}> Homepage </Button>
    } else if (this.state.isQuery) {
      view = <QueryView countries={this.state.countries} airports={this.state.airports} airplanes={this.state.airplanes} user={this.state.user}/>
      backButton = <Button className="backBtn" variant="primary" onClick={this.handleBackClick}> Homepage </Button>
    } else {
      view = <DefaultView setGameView={this.handleGameView} setQueryView={this.handleQueryView} />
      backButton =  <Button className="backBtn" variant="primary" onClick={this.logout}> Log Out </Button>;
    }

    if (!this.state.loaded) return <div></div>
  
    return (
      <div className="mainScreen">
        <div className="appView">
          {view}
        </div>
        <div className="backOption">
            {backButton}
        </div>
      </div>
    )
  }

}

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <div>
      <h1 id="titleBar">Airspace</h1>
    </div>
  }
}

function App() {
  return (
    <div className="App">
      {/* <ShowQueryResult country="CA"/> */}
      <Greeting/>
      <Main/>
    </div>
  );
}

export default App;












// class TestMain extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//   }

//   render() {
//     return (
//       <div>
//           <DoubleInput title="double-input"/>
//           <SingleInput title="single-input"/>
//           <OutputTable data={const_data}/>
//           <InfoModal/>
//           <DomesticPortionQuery/>
//       </div>
//     )
//   }
// }

// class ShowQueryResult extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       show: "loading..."
//     }
//   }

//   componentDidMount(){
//     let country = this.props.country;

//     let request = GCP_ENDPOINT + `/get_some_flights?limit=${40}`
//     let response = axios.get(request)
//       .then((value) => {
//         console.log("SOME FLIGHTS: ", response);
//         this.setState({
//           show: "loaded"
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   render(){
//     return <div>
//       For country: {this.props.country}, the fraction of domestic flights is {this.state.show}
//     </div>
//   }
// }
