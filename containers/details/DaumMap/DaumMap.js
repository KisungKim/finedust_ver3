/* global daum */

import React, { Component } from "react";
import "./DaumMap.css";
import ParkInfo from '../ParkInfo/ParkInfo';
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as latlngActions from "../../../store/modules/latlng";
import { bindActionCreators } from "redux";
import axios from "axios";

class DaumMap extends Component {
  setCenter = (selected, type) => {
    let newCenter = new daum.maps.LatLng(selected.lat, selected.lng);
    this.state.map.setCenter(newCenter);
    this.state.map.setLevel(5);
    let infoEl = document.getElementById('map-show-detail-info');
    let childEl = '';
    if(type === 'big') {
      childEl = '<div class="map-show-detail-info-section">' + selected.p_nm + 
                  '<ul>' +  
                    '<li>' + selected.gugun + ' ' + selected.dong + '</li>' +
                    '<li>' + selected.p_address + '</li>' + 
                  '</ul>' + 
                '</div>';
    }
    else {
      childEl = '<div class="map-show-detail-info-section">' + selected.p_small_nm + 
                  '<ul>' + 
                    '<li>' + selected.gugun + ' ' + selected.dong + '</li>' +
                    '<li>' + selected.p_small_type + '</li>' + 
                  '</ul>' + 
                '</div>';
    }
    infoEl.innerHTML = childEl;
  }  

  resize = () => {
    // 지도의 크기가 작은 상태일 때
    let mapContainer = document.getElementById('map');
    let beforeHeight = mapContainer.style.height;
    if(beforeHeight === '80vh') {
      mapContainer.style.height = '50vh';
      document.getElementById('handleSize').innerHTML = "크게하기";
    }
    else  {
      mapContainer.style.height = '80vh';
      document.getElementById('handleSize').innerHTML = "작게하기";
    }
    // relayout()을 실행하여야 지도가 변경된 크기로 적용됩니다.
    this.state.map.relayout();
  }

  // 현재 지도 중심 좌표 일시저장
  state = {
    big_park_data: [],
    small_park_data: [],
    map: null,
  }

  loadData = async() => {
    const big_park_data = await axios.get("/app01/start_app/data_big_park");
    const small_park_data = await axios.get("/app01/start_app/data_small_park");
    const selected_big_park = big_park_data.data.filter(item => {
      return item.gugun === this.props.data[0].gugun;
    });
    const selected_small_park = small_park_data.data.filter(item => {
      return item.gugun === this.props.data[0].gugun;
    });
    this.setState({
      big_park_data: selected_big_park,
      small_park_data: selected_small_park
    });
  };

  componentDidMount() {
    this.loadData();
    const { LatlngActions, data } = this.props
    LatlngActions.change({
      lat : data[0].lat,
      lng : data[0].lng
    });
    const lat = data[0].lat
    const lng = data[0].lng

    let mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: 6
      };
    let map = new daum.maps.Map(mapContainer, mapOption);
    this.setState({map: map, lat:lat, lng:lng});
  } 

  render() {
    const map = this.state.map;
    if(map && this.state.big_park_data && this.state.small_park_data) {
      let clusterer = new daum.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 6
      });
      let markersBig = this.state.big_park_data.map(
        (items) => { 
          let marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(items.lat, items.lng), 
            title : items.p_nm,
            clickable : true 
          });
          daum.maps.event.addListener(marker, 'click', function() {
            let infoEl = document.getElementById('map-show-detail-info');
            let childEl = '<div class="map-show-detail-info-section">' + items.p_nm + 
                            '<ul>' + 
                              '<li>' + items.gugun + ' ' + items.dong + '</li>' +
                              '<li>' + items.p_address + '</li>' + 
                            '</ul>' + 
                          '</div>';
            infoEl.innerHTML = childEl;
          });
          return marker;
        }
      );
      let markersSmall = this.state.small_park_data.map(
        (items) => {
          let marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(items.lat, items.lng), 
            title : items.p_small_nm, 
            clickable : true
          });
          daum.maps.event.addListener(marker, 'click', function() {
            let infoEl = document.getElementById('map-show-detail-info');
            let childEl = '<div class="map-show-detail-info-section">' + items.p_small_nm + 
                            '<ul>' + 
                              '<li>' + items.gugun + ' ' + items.dong + '</li>' +
                              '<li>' + items.p_small_type + '</li>' + 
                            '</ul>' + 
                          '</div>';
            infoEl.innerHTML = childEl;
          });  
          return marker;
        }
      );
      clusterer.addMarkers(markersBig);
      clusterer.addMarkers(markersSmall);
    }
    return (
      <div>       
        <div id="map">
          <div id="map-show-detail-info">
          </div>
          <button
              id="handleSize"
              onClick={this.resize} >
          크게하기
          </button>
          <center>loading...</center>
        </div>
        <div className="park-info">
          <ParkInfo 
            bigParkData={this.state.big_park_data}
            smallParkData={this.state.small_park_data}
            setCenter={this.setCenter} />
        </div>  
      
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  LatlngActions: bindActionCreators(latlngActions, dispatch)
});

export default connect(null,mapDispatchToProps)(DaumMap);
