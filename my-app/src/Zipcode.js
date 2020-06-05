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
                this.setState({
                    results: data
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(e) {
        this.setState({
            Zipcode: e.target.value,
        });
    }

    render() {
        let display;
        if (!this.state.Zipcode) {
            display = <p>Loading...</p>;
        } else {
            display = (
                <>
                    <div>
                        {this.state.results.map(result => {
                            return (
                                <div key={result.RecordNumber}>
                                    <h1>{result.LocationText}</h1>
                                    <ul>
                                        <li>State: {result.State}</li>
                                        <li>Total Wages: {result.TotalWages}</li>
                                        <li>Estimated Population: {result.EstimatedPopulation}</li>
                                        <li>Location: {result.Location}</li>
                                    </ul>
                                </div>
                            )
                        })}

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