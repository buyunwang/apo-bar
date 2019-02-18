import React from 'react'
import '../style/common.css';
import { connect } from 'react-redux';
import { beersFetchData, beersUpdateData, beersDeleteData } from '../_actions/beers';

class Brewery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputvalue: ''
        };

        this.getDrink = this.getDrink.bind(this);
        this.getDrinks = this.getDrinks.bind(this);
        this.updateDrink = this.updateDrink.bind(this);
        this.deleteDrink = this.deleteDrink.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.title = "Apo Bar - Brewery";
        this.props.fetchData('http://0.0.0.0:9190/beers');
    }

    getDrink = () => {
        this.setState(state =>(
            { 
                updateDrink:false,
                getAllBeer: false,
                deleteDrink: false,
                luckyBeer: this.props.beers[Math.floor(Math.random() * this.props.beers.length)]
            }));
    }

    getDrinks = () => {
        this.setState( state => (
            {
                luckyBeer:false,
                updateDrink: false,
                getAllBeer: true,
                deleteDrink:false
            }));
        
    }

    updateDrink = () => {
        this.setState(state => (
            {   
                getAllBeer:false,
                updateDrink:true,
                deleteDrink: false
            }));

    }

    deleteDrink = () =>{
        this.setState(state => (
            {
                deleteDrink: true,
                updateDrink: false,
                getAllBeer: false
            }));
    }

    handleUpdate=(event) =>{
        console.log('Form value: ' + this.state.inputvalue);
        this.props.updateData("http://0.0.0.0:9190/beers/",this.state.luckyBeer.ID, {"name":this.state.inputvalue});
        
    }
    handleChange(event) {
        this.setState({ inputvalue: event.target.value });
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.deleteData("http://0.0.0.0:9190/beers/", this.state.luckyBeer.ID);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading beers</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
                <div className = "body">
                    <h1>Welcome to the brewery</h1>
                    <p>Click the buttons to perform beery actions</p>
                    <div className = "flex-row">
                    <button onClick={this.getDrinks}>Get all beers</button>
                    <button onClick={this.getDrink}>I want a beer</button>
                    <button onClick={this.updateDrink}>Update this beer</button>
                    <button onClick={this.deleteDrink}>Delete this beer</button>
                    </div>
                {this.state.getAllBeer && !this.state.updateDrink ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.beers.length > 0 ? (
                                this.props.beers.map(beer => (
                                    <tr key={beer.ID}>
                                        <td>{beer.ID}</td>
                                        <td>{beer.name}</td>
                                    </tr>
                                ))
                            ) : (
                                    <tr>
                                        <td colSpan={3}>No beers</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                ):this.state.luckyBeer&&!this.state.updateDrink&&!this.state.deleteDrink? (
                        <div id="glass">
                    <p>{this.state.luckyBeer.name}</p>
                        </div>
                ) :this.state.updateDrink&&!this.state.luckyBeer?(
                        <p>Please get a drink first</p>
                    ):this.state.updateDrink&&!this.state.getAllBeer?(
                        <div>
                            <form onSubmit={this.handleUpdate}
                                id={this.state.luckyBeer.ID}
                                >
                                    <label>
                                        Chosen beer: {this.state.luckyBeer.name}                          
                                    </label>
                                    <input type="text" value={this.state.inputvalue} onChange={this.handleChange} />    
                                    <input type="submit" value="Submit" />
                                </form>
                        </div>
                    ) : this.state.deleteDrink && !this.state.luckyBeer ?(
                                    <p>Please get a drink first</p>
                    ) : this.state.deleteDrink && this.state.luckyBeer?(
                       <div>
                           <label> Do you want to delete: {this.state.luckyBeer.name}?</label>
                           <button className="yes" onClick={this.handleDelete}>Sure</button>
                       </div>
                    ):null}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers,
        hasErrored: state.beersHasErrored,
        isLoading: state.beersIsLoading,
        updatedBeer: state.updatedBeer,
        deletedBeer: state.deletedBeer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(beersFetchData(url)),
        updateData: (url,id,data) => dispatch(beersUpdateData(url,id,data)),
        deleteData: (url, id) => dispatch(beersDeleteData(url, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Brewery);