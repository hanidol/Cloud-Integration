import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrentLocation from "./Components/Map";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import env from "react-dotenv";
console.log(env);

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <>
        <div>
          <Navbar></Navbar>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <CurrentLocation
                  centerAroundCurrentLocation
                  google={this.props.google}
                >
                  <Marker
                    onClick={this.onMarkerClick}
                    name={"Current Location"}
                  />
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                  </InfoWindow>
                </CurrentLocation>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_key,
})(MapContainer);
