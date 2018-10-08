/* global daum */

import React, { Component } from "react";
// 다음지도 컴포넌트 테스트용입니다
/*
import DaumMap from "../container/DaumMap";
import TestJson from "../components/TestJson";
import SearchBar from "../components/SearchBar";
import DaumMapComponent_createMap from "../components/DaumMapComponent_createMap";
*/
// render에 추가해서 사용하세요 : <DaumMapComponent_createMap />

import MainTemplate from "./containers/main/MainTemplate";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailTemplate from "./components/details/DetailTemplate/"; // ?????

import NavBar from "./components/navbar";
import axios from "axios";
import Loading from "./components/main/Loading";
import 'babel-polyfill';
class App extends Component {
  
  state = {
    data: null
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const data = await axios.get("/app01/start_app/data_mise");
    console.log(data.data);
    this.setState({
      data: data.data
    });
  };

  render() {
    const {data} = this.state;
    if(!data) {
      return(
        <Loading pageHeight={100} logoWidth={100}/>
      );
    }
    return (
      <Router>
        <div>
          {/* <Link to={'/'}>홈으로</Link> */}
          <NavBar />
          <Switch>
            <Route
              path="/app01/main_page_new/details/:stationid"
              render={({ match }) => {
                return <DetailTemplate data={data} match={match} />;
              }}
            />
            <Route
              exact
              path="/app01/main_page_new/"
              render={({ history }) => {
                return <MainTemplate data={data} history={history} />;
              }}
            />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;