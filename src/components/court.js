import React, { Component } from 'react';
import '../style/App.css';

class Court extends Component {
  componentDidMount() {
    document.title = "Apo Bar"
  }
  render() {
    return (
        <div className = "body">
            <div>
                <h1>Welcome to the court</h1>
                <p>In which bar do you want to go?</p>
            </div>
            <div className="buttons">
              <div><a href="/winery">The winery</a></div>
              <div><a href="/brewery">The brewery</a></div>
            </div>
        </div>
    );
  }
}

export default Court;
