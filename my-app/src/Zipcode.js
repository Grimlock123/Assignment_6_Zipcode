import React, { Component } from "react";
import axios from "axios";

class Zipcode extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            zip: null, Results: []
         };
         this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        axios 
        .get("http://ctp-zip-api.herokuapp.com/zip/"+ this.state.zip)
        .then((response) => {
            const data = response.data;
            const newZipObj = {
                ResultList: data
            };
            this.setState({Results: newZipObj});
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
        if(!this.state.Results.ResultList) {
            display = <p>Try a different one</p>;
        } else {
            console.log(this.state.zip);
            display = (
                <>
                <ul>
                    {this.state.Results.ResultList.map((Results) => <li key= { Results }> {Results} </li>)}
                
                </ul>
                </>
            );
        }

        return( 
        <div>
            <p> Enter The Zipcode You Want to retrieve</p>
            <input
                type= "text"
                name = "zip"
                defaultValue = {this.state.zip}
                onChange={(e) => this.handleChange(e)} >
            </input>
            <div className ="zipcode">{display}</div>
        </div>
        );
    }
}

export default Zipcode;