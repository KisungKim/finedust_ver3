import React, { Component } from 'react';
import { connect } from "react-redux";
import * as parkActions from "../../../store/modules/parks";
import { bindActionCreators } from "redux";
import './Parkinfo.css'
import Loading from '../../../components/main/Loading';

// 이제 지도 중심좌표랑 DB에서 가져온 데이터들이랑 위도 경도 차이가 얼마 이하로 나면 가져오는 식으로 하면 됨
class ParkInfo extends Component {
  render() {
    // this.loadData()
    let bigParkData = this.props.bigParkData;
    let smallParkData = this.props.smallParkData;
    // console.log(parks)
    
    if(!bigParkData[0]) {
      return (
        <Loading pageHeight={40} logoWidth={50}/>
      )
    }
    else {
      return (
        <div className='park-list-father'>
          <div className='park-list'>
            {bigParkData.map(
              (park) => {
                return (
                  <div 
                    className="big-park-list" 
                    onClick={ () => this.props.setCenter(park, 'big')} >
                    {park.p_nm}
                  </div>
                );
              }
            )}
          </div>
          <div className='park-list'>
            {smallParkData.map(
              (park) => {
                return (
                  <div 
                    className="small-park-list" 
                    onClick={ () => this.props.setCenter(park, 'small')}>
                    {park.p_small_nm}
                  </div>
                );
              }
            )}
          </div>
        </div>
      );
    }
  }
} 

const mapStateToProps = (state) => ({
  // 이름이 똑같아서 주의, 이게 맞음
  parks : state.parks.parks,
  // loading : state.pender.pending['GET_PARK'],
  // error : state.pender.failure['GET_PARK']
})

const mapDispatchToProps = dispatch => ({
  ParkActions: bindActionCreators(parkActions, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(ParkInfo);