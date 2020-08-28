import React from 'react';
import TextField from '@material-ui/core/TextField';

class SingleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "",
    }
    this.onInput1Change = this.onInput1Change.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInput1Change(e) {
    this.setState({ input1: e.target.value })
  }
  
  onButtonClick(e) {
    //execute the query with the given input data
    console.log(this.state.input1);
  }

  render() {
    return (
      <div>
        <div className="input-title"> {this.props.title} </div>
        <div className="double-input-box">
          <form noValidate>
            <TextField id="input1" label="input1" onChange={this.onInput1Change}/>
          </form>
        <div className="inputBtn"> 
          <button className="resultBtn" onClick={this.onButtonClick} > Go! </button>
        </div>
        </div>
      </div>
    )
  }
}

export default SingleInput;
