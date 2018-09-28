import React, { Component } from 'react';
import { connect } from "react-redux";
import * as parkActions from "../../../store/modules/parks";
import { bindActionCreators } from "redux";
import './Parkinfo.css'
import Loading from '../../../components/main/Loading';

// 이제 지도 중심좌표랑 DB에서 가져온 데이터들이랑 위도 경도 차이가 얼마 이하로 나면 가져오는 식으로 하면 됨
class ParkInfo extends Component {
  
  loadData = async () => {
    const {ParkActions} = this.props    
    try{
      const response = await ParkActions.getPark()
      console.log('data loaded')
    }catch(e){
      console.log(e)
    }    
  }

  componentDidMount(){
    this.loadData()
  }
  
  render() {
    // this.loadData()
    const {parks} = this.props
    console.log(parks)
    
    if(!parks[0]){
      return (
        <Loading pageHeight={40} logoWidth={50}/>
      )
    }else{

    return (
      <div>
        {parks[0].p_facilities}
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