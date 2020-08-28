import React from 'react';
import TextField from '@material-ui/core/TextField';

class DoubleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "",
      input2: "",
    }
    this.onInput1Change = this.onInput1Change.bind(this);
    this.onInput2Change = this.onInput2Change.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInput1Change(e) {
    this.setState({ input1: e.target.value })
  }
  onInput2Change(e) {
    this.setState({ input2: e.target.value })
  }
  onButtonClick(e) {
    //execute the query with the given input data
    console.log(this.state.input1);
    console.log(this.state.input2);
  }

  render() {
    return (
      <div>
        <div className="input-title"> {this.props.title} </div>
        <div className="double-input-box">
          <form noValidate>
            <TextField id="input1" label="input1" onChange={this.onInput1Change}/>
            <TextField id="input2" label="input2" onChange={this.onInput2Change}/>
          </form>
        </div>
        <div className="inputBtn"> 
          <button className="resultBtn" onClick={this.onButtonClick} > Go! </button>
        </div>
      </div>
    )
  }
}

export default DoubleInput;
