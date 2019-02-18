import React from 'react'
import '../style/common.css';
import { connect } from 'react-redux';
import { winesFetchData } from '../_actions/wines';

class Winery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.getDrink = this.getDrink.bind(this);
    }

    componentDidMount() {
        document.title = "Apo Bar - Winery"
        this.props.fetchData('http://0.0.0.0:9190/wines');
    }

    getDrink = () => {
        this.setState(state => (
            {
                luckyWine: this.props.wines[Math.floor(Math.random() * this.props.wines.length)]
            }));
        console.log(this.state.luckyWine)
    }

    render() {
        return (

                <div className = "body">
                    <h1>Welcome to the winery</h1>
                    <p>Click the button to get some wine</p>
                    <button onClick={this.getDrink}>I want wine</button>
                {this.state.luckyWine? (<div id="glass">
                    <p>{this.state.luckyWine.name}</p>
                </div>):null}
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        wines: state.wines,
        hasErrored: state.winesHasErrored,
        isLoading: state.winesIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(winesFetchData(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Winery);