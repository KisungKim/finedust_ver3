/* global daum */

import React, { Component } from "react";
import "./DaumMap.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as latlngActions from "../../../store/modules/latlng";
import { bindActionCreators } from "redux";

class DaumMap extends Component {
  // 현재 지도 중심 좌표 일시저장

  componentDidMount() {
    const { LatlngActions, data, match } = this.props
    
    LatlngActions.change({
      lat : data[Number(match.params.id) - 1].lat,
      lng : data[Number(match.params.id) - 1].lng
    })


    const lat = data[Number(match.params.id) - 1].lat
    const lng = data[Number(match.params.id) - 1].lng


    let mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: 3
      };
    let map = new daum.maps.Map(mapContainer, mapOption);

    daum.maps.event.addListener(map, "center_changed", () => {
      // 지도의  레벨을 얻어옵니다
      var level = map.getLevel();
      // 지도의 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      // var message = '<p>지도 레벨은 ' + level + ' 이고</p>';
      // message += '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';


      LatlngActions.change({
        lat: latlng.getLat(),
        lng: latlng.getLng()
      })
    });
  } // cdm end



  render() {
    return (
      <div>       
        <div id="map">
          <center>loading...</center>
        </div>      
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  LatlngActions: bindActionCreators(latlngActions, dispatch)
});

export default connect(null,mapDispatchToProps)(DaumMap);
