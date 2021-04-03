import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./Converter.css";
import LineChart from "./LineChart.js/LineChart";
import axios from "axios";

class Converter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyData: {
        USD: { rate: "" },
        GBP: { rate: "" },
        EUR: { rate: "" }
      },
      country: {
        USD: "United States Dollars",
        GBP: "British Pounds",
        EUR: "Euros",
      },
      convertedPrice: 0,
      selectedCurrency: "USD",
    };
  }

  componentDidMount() {
    this.loadData();
  }
  // componentDidUpdate(){
  //     this.loadData();
  // }

  loadData() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        let a = this.state.currencyData;
        a = { ...response.data.bpi };
        this.setState({ currencyData: a });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  currencySelectHandler = (country) => {
    //console.log("selected :" + country);
    this.setState({ selectedCurrency: country });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <span>1 Bitcoin Equals</span>

            <DropdownButton
              className="Dropdown"
              variant="white"
              id="dropdown-basic-button"
              title="USD- United States Dollar"
            >
              <Dropdown.Item onSelect={() => this.currencySelectHandler("USD")}>
                USD- United States Dollar
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => this.currencySelectHandler("GBP")}>
                GBP- British Pound Sterling
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => this.currencySelectHandler("EUR")}>
                EUR- Euro
              </Dropdown.Item>
            </DropdownButton>

            <span>
              {this.state.currencyData[this.state.selectedCurrency].rate}
              {this.state.country[this.state.selectedCurrency]}
            </span>
          </div>
          <div className="col-6">
            <LineChart />
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;