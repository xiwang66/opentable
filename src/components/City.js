import React from "react";
import axios from "axios";
import { AutoComplete } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import propTypes from "prop-types";

let cities = [];
let dataSource = [];
class City extends React.Component {
  state = {
    cities: [],
    loading: true
  };
  componentDidMount() {
    this.getCities();
  }

  async getCities() {
    this.setState({
      loading: true
    });
    try {
      cities = await axios.get("http://opentable.herokuapp.com/api/cities");
      this.setState({
        ...this.state,
        cities: cities.data.cities,
        loading: false
      });
    } catch (error) {
      console.log("Something Went Wrong!");
      console.log({ error });
    }
  }
  handleSelect = citySelected => {
    // Update State With Redux
    this.props.handleSelectCity(citySelected);
  };

  render() {
    dataSource = this.state.cities;
    const { loading } = this.state;
    if (loading) {
      return (
        <div>
          <AutoComplete
            style={{ width: "100%" }}
            placeholder="Select Your City"
          />
        </div>
      );
    }
    if (!loading) {
      return (
        <div>
          <AutoComplete
            onSelect={this.handleSelect}
            style={{ width: "100%" }}
            dataSource={dataSource}
            placeholder="Select Your City"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleSelectCity: citySelected => {
      dispatch({ type: "SHOW_RESTAURANTS", citySelected });
    }
  };
};

City.propTypes = {
  handleSelectCity: propTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(City);
