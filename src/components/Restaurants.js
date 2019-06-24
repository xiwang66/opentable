import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "antd";
import spinner from "../assets/images/spinner.gif";
import propTypes from "prop-types";

let restaurants = [];

class Restaurants extends React.Component {
  state = {
    restaurants: [],
    loaded: false,
    loading: true
  };

  renderSwitch(price) {
    switch (price) {
      case 0:
        return "";
      case 1:
        return "$";
      case 2:
        return "$$";
      case 3:
        return "$$$";
      case 4:
        return "$$$$";
      case 5:
        return "$$$$$";
      default:
        return "";
    }
  }

  // Default City = Toronto
  componentWillMount() {
    this.getRestaurantsDefault();
  }
  async getRestaurantsDefault() {
    try {
      const restaurants = await axios.get(
        `http://opentable.herokuapp.com/api/restaurants?city=toronto`
      );
      // console.log(restaurants.data.restaurants)
      this.setState({
        restaurants: restaurants.data.restaurants,
        loaded: true
      });
    } catch (error) {
      console.log({ error });
    }
  }

  componentDidUpdate(prevProps) {
    this.props.citySelected !== prevProps.citySelected &&
    axios
      .get(
        `http://opentable.herokuapp.com/api/restaurants?city=${
          this.props.citySelected
        }`
      )
      .then(res => {
        restaurants = res.data.restaurants;
        this.setState({
          restaurants,
          loaded: true,
          loading: false
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }

  render() {
    const { Meta } = Card;

    const { loaded, loading } = this.state;

    if (loaded) {
      return (
        <div>
          <Row gutter={48} type="flex" justify="space-around" align="middle">
            {this.state.restaurants.map((restaurant, i) => {
              let price = this.renderSwitch(restaurant.price);
              let restaurant_details =
                restaurant.address + " " + restaurant.city + " " + price;
              return (
                <Col
                  key={i}
                  value={100}
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                >
                  <Card
                    hoverable
                    cover={
                      <img alt={restaurant.name} src={restaurant.image_url} />
                    }
                  >
                    <Meta
                      title={restaurant.name}
                      description={restaurant_details}
                    />{" "}
                    <br />{" "}
                    <a
                      alt="Reserve Table"
                      href={restaurant.reserve_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <Button type="danger">Reserve Table</Button>
                    </a>{" "}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      );
    }
    if (loading) {
      return (
        <div
          style={{
            textAlign: "center"
          }}
        >
          <img
            style={{
              width: "50%",
              height: "50%"
            }}
            alt="spinner"
            src={spinner}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    citySelected: state.citySelected
  };
};

Restaurants.propTypes = {
  citySelected: propTypes.string.isRequired
};

export default connect(mapStateToProps)(Restaurants);
