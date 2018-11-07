/* global daum */

import React, { Component } from "react";
import "./DaumMap.css";
import ParkInfo from '../ParkInfo/ParkInfo';
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as latlngActions from "../../../store/modules/latlng";
import { bindActionCreators } from "redux";
import axios from "axios";
import UserParkInput from '../UserParkInput/UserParkInput'

class DaumMap extends Component {
  setCenter = (selected, type) => {
    let newCenter = new daum.maps.LatLng(selected.lat, selected.lng);
    this.state.map.setCenter(newCenter);
    this.state.map.setLevel(5);
    let infoEl = document.getElementById('map-show-detail-info');
    let childEl = '';
    if (type === 'big') {
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
    if (beforeHeight === '80vh') {
      mapContainer.style.height = '50vh';
      document.getElementById('handleSize').innerHTML = "크게하기";
    }
    else {
      mapContainer.style.height = '80vh';
      document.getElementById('handleSize').innerHTML = "작게하기";
    }
    // relayout()을 실행하여야 지도가 변경된 크기로 적용됩니다.
    this.state.map.relayout();
  }

  addUserPark = (lat, lng) => {
    let targetObj = document.getElementById('map-add-user-park-input-page');
    targetObj.hidden = false;
    targetObj.setAttribute('lat', lat);
    targetObj.setAttribute('lng', lng);
  }

  clickHandler = (mouseEvent) => {
    let latlng = mouseEvent.latLng;
    
    /* TODO : 적잘한 이미지 만들기 ===================== */
    let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new daum.maps.Size(22, 25), // 마커이미지의 크기입니다
    imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption); // 마커가 표시될 위치입니다
    let marker = new daum.maps.Marker({
      position: latlng,
      image: markerImage
    });
    /* TODO : 적절한 이미지 만들기 <끝>================== */
    marker.setPosition(latlng);
    marker.setMap(this.state.map);

    this.addUserPark(latlng.getLat(), latlng.getLng());
    this.sleeping(10);
  }

  sleeping = (time) => {
    let targetObj = document.getElementById('map-add-user-park');
    if (targetObj.innerText === "누르면 추가 시작") {
      // 중간에 작업 종료되었을 경우, 함수 버림
      return;
    }
    targetObj.innerHTML = '처리중.. 남은 대기시간 : ' + time;
    let f = this.sleeping;
    if (time > 0) {
      // 루프를 돌며 카운트다운
      setTimeout(function looping() {
        let newTime = time - 1;
        f(newTime);
      }, 1000);
    }
    else {
      // 마지막 카운트에서 초기화작업
      this.removeAdd();
    }
  }

  detachListner = (f) => {
    daum.maps.event.removeListener(this.state.map, 'click', f);
  }

  removeAdd = () => {
    document.getElementById('map-not-add-user-park').hidden = true;
    document.getElementById('map-add-user-park').disabled = false;
    document.getElementById('map-add-user-park').innerHTML = "누르면 추가 시작";
    this.detachListner(this.clickHandler);
  }

  addStart = () => {
    document.getElementById('map-not-add-user-park').hidden = false;
    document.getElementById('map-add-user-park').innerHTML = "원하는 지역을 클릭하세요";
    document.getElementById('map-add-user-park').disabled = true;
    daum.maps.event.addListener(this.state.map, 'click', this.clickHandler);
  }

  // 현재 지도 중심 좌표 일시저장
  state = {
    big_park_data: [],
    small_park_data: [],
    map: null,

  }

  loadData = async () => {
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
      lat: data[0].lat,
      lng: data[0].lng
    });
    const lat = data[0].lat
    const lng = data[0].lng

    let mapContainer = document.getElementById("map"),
      mapOption = {
        center: new daum.maps.LatLng(lat, lng),
        level: 6
      };
    let map = new daum.maps.Map(mapContainer, mapOption);
    this.setState({ map: map, lat: lat, lng: lng });
  }

  render() {
    const map = this.state.map;
    if (map && this.state.big_park_data && this.state.small_park_data) {
      let clusterer = new daum.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 6
      });
      let markersBig = this.state.big_park_data.map(
        (items) => {
          let marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(items.lat, items.lng),
            title: items.p_nm,
            clickable: true
          });
          daum.maps.event.addListener(marker, 'click', function () {
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
            title: items.p_small_nm,
            clickable: true
          });
          daum.maps.event.addListener(marker, 'click', function () {
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
          <div id="map-show-detail-info"></div>
          <div 
            id='map-add-user-park-input-page' 
            hidden='true'
            value='' >
          <UserParkInput />
          </div>
          <button
            id='map-add-user-park'
            onClick={this.addStart}>
            누르면 추가 시작
          </button>
          <button
            id='map-not-add-user-park'
            onClick={this.removeAdd}
            hidden='true'>
            추가모드 없애기
          </button>
          <button
            id="handleSize"
            onClick={this.resize} >
            크게하기
          </button>
          <center>loading...</center>
        </div>
        <div id="park-info">
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

export default connect(null, mapDispatchToProps)(DaumMap);
