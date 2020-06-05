import React, { Component } from "react";
import axios from "axios";

class Zipcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Zipcode: '', results: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        console.log("got to component did update");
        axios
            .get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.Zipcode)
            .then((response) => {
                const data = response.data;
                console.log(data);

                const newResultObj = {
                    State: data.State,
                    TotalWages: data.TotalWages,
                    EstimatedPopulation: data.EstimatedPopulation,
                    Location: (data.Lat, data.Long),
                };
                this.setState({ results: newResultObj });
            })
            .catch((err) => console.log(err));
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        let display;
        if (!this.state.Zipcode) {
            display = <p>Loading...</p>;
        } else {
            console.log("HEYOOO");
            display = (
                <>
                    <div>
                        <h1>{this.state.results.LocationText}</h1>
                        <ul>
                            <li>State: {this.state.results.State}</li>
                            <li>Total Wages: {this.state.results.TotalWages}</li>
                            <li>Estimated Population: {this.state.results.EstimatedPopulation}</li>
                            <li>Location: {this.state.results.Location}</li>
                        </ul>
                    </div>
                </>
            );
        }

        return (
            <div>
                <p> Enter Zipcode to retrieve city </p>
                <input
                    type="text"
                    name="Zipcode"
                    defaultValue={this.state.Zipcode}
                    onChange={(e) => this.handleChange(e)} >
                </input>
                <div className="Zipcode">{display}</div>
            </div>
        );
    }
}

export default Zipcode;