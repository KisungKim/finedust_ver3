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
    console.log("term is what?", data);
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
        
        <div className="footer" >
          <div className="item">여기밑에는</div>
          <div className="item">DB에서데이터</div>
          <div className="item">받아오나?</div>
          <div className="item">그럼 container로</div>
        </div>
      </div>
    );
  }
}



export default connect(
  state => ({term : state.input.term})
)(MainTemplate);
