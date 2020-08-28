import React from 'react';
import Button from 'react-bootstrap/Button';
import './defaultView.css';

class DefaultView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="defaultView background">
                <div className="top-container"> </div>
                <div className="menu-container">
                    <Button id="menuOptions" variant="primary" onClick={this.props.setGameView}> Game View </Button>
                    <Button id="menuOptions" variant="primary" onClick={this.props.setQueryView}> Query View </Button>
                </div>
            </div>    
        )
    }
}

export default DefaultView;