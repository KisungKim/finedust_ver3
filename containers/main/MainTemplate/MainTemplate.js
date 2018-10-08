import React, { Component } from "react";
import SearchBar from "../SearchBar";
import SearchList from "../SearchList";
import "./MainTemplate.css";

import * as parkActions from "../../../store/modules/parks";  
import {connect} from 'react-redux'


class MainTemplate extends Component {


  render() {
    // 데이터를 아예 아래쪽으로 옮겨야 할듯 한데
    const { data } = this.props;
    const filteredData = data.filter(
      item => item.stationname.indexOf(this.props.term) !== -1
    );
    console.log(filteredData);

    return (
      <div className="app-template">
        <SearchBar
          handleTermChange={this.handleTermChange}
          term={this.props.term}
          data={filteredData}
          history={this.props.history}
        />
        
        <SearchList
          data={filteredData}
          term={this.props.term}
          history={this.props.history}
        />
        <div className="footer">
            <div className="footer-cell-container">자신의 지역을 클릭하세요</div>
            <div className="footer-cell-container">지역의 대기환경을 보세요</div>
            <div className="footer-cell-container">산책길을 확인하세요</div>
          </div>
        </div>
    );
  }
}



export default connect(
  state => ({term : state.input.term})
)(MainTemplate);
