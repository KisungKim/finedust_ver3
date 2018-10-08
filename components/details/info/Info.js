import React, { Component } from 'react';
import './Info.css'
import {AreaChart} from 'react-easy-chart';
import axios from "axios";

class Info extends Component {


  convertUvValueToGrade = (data) => {
    if(Number(data) >= 11) {
      data = "매우 위험"
    }
    else if(Number(data) >= 8) {
      data = "매우 높음"
    }
    else if(Number(data) >= 6) {
      data = "높음"
    }
    else if(Number(data) >= 3) {
      data = "보통"
    }
    else {
      data = "낮음"
    }
    return data;
  }

  state = {
    uvData: []
  }

  loadData = async() => {
    const uvData = await axios.get("/app01/start_app/data_uv");
    const selectedUvData = uvData.data.filter(item => {
      return item.stationid === this.props.data[0].stationid;
    });
    this.setState({
      uvData: selectedUvData
    });
  };

  componentDidMount() {
    this.loadData();
  }
   
  render() {
    const data = this.props.data;
    const uvData = this.state.uvData;
    if(data[0] && uvData[0]) {

      uvData[0].today = this.convertUvValueToGrade(uvData[0].today);
      uvData[0].tomorrow = this.convertUvValueToGrade(uvData[0].tomorrow);
      uvData[0].the_day_after_tomorrow = this.convertUvValueToGrade(uvData[0].the_day_after_tomorrow);
      console.log(uvData[0]);

      data.map(
        (item) => {
          if (item.pm10grade === "1") {
            item.pm10grade = "좋음"
          }
          else if (item.pm10grade === "2") {
            item.pm10grade = "보통"
          }
          else if (item.pm10grade === "3") {
            item.pm10grade = "나쁨"
          }
          else {
            item.pm10grade = "매우 나쁨"
          }
        }
      );
      let today = data[data.length-1];
      let yesterday = data[data.length-2];
      let dayBeforeYesterday = data[data.length-3];
      let result = null;
      let background = null;
      if(Number(today.pm10value) <= 15){ 
        result = '최고^_^'
        background = "#d0ebff"      
      }else if(Number(today.pm10value)<= 30){
        result = "좋음"
        background = "#a5d8ff"
      }else if(Number(today.pm10value) <= 40){
        result = "양호"
        background = "#4dabf7"
      }else if(Number(today.pm10value) <= 50){
        result = "보통"
        background = "#63e6be"
      }else if(Number(today.pm10value) <= 75){
        result = "나쁨"
        background = "#ffe066"
      }else if(Number(today.pm10value) <= 100){
        result = "상당히 나쁨"
        background = "#fcc419"      
      }else if(Number(today.pm10value) <= 150){
        result = "매우 나쁨"
        background = "#f08c00"
      }else{
        result = "최악"
        background = "#212529"
      }
      return (
        <div className="info">        
          <div className="main">
            <h2>{today.stationname}의 오늘 공기는</h2>
              
            <h1>{result} ({today.pm10value} ㎍/㎥) </h1>        
            <center><div style={{background, width:'100px', height:'100px', borderRadius:'50px'}}></div></center>
              
          </div>
          
          <div className="middle">
          <div className="mise-header">최근 미세먼지 지수</div>
          <AreaChart
            margin={{top: 30, right: 30, bottom: 30, left: 30}}
            axes
            dataPoints
            areaColors={['#3498DB']}
            width={350}
            height={200}
            yType={'text'}
            xType={'text'}
            // 여기 넓이의 경우 이 이하로 줄어들 경우 다르게 표시 가능
            yDomainRange={['좋음', '보통', '나쁨', '매우 나쁨']}
            interpolate={'cardinal'}
            data={[
              [
                { x: '그저꼐', y: dayBeforeYesterday.pm10grade },
                { x: '어제', y: yesterday.pm10grade },
                { x: '오늘', y: today.pm10grade },
              ]
            ]} />

          <div className="uv-header">최근 자외선 지수</div>
          <AreaChart
            margin={{top: 30, right: 30, bottom: 30, left: 30}}
            axes
            dataPoints
            areaColors={['chocolate']}
            width={350}
            height={200}
            yType={'text'}
            xType={'text'}
            // 여기 넓이의 경우 이 이하로 줄어들 경우 다르게 표시 가능
            yDomainRange={['낮음', '보통', '높음', '매우 높음', '매우 위험']}
            interpolate={'cardinal'}
            data={[
              [
                { x: '그저꼐', y: uvData[0].today },
                { x: '어제', y: uvData[0].tomorrow },
                { x: '오늘', y: uvData[0].the_day_after_tomorrow },
              ]
            ]} />
  
          </div>
          {/* 상세정보 포함 */}
          <div className="details">
            <div className="dropbtn">
              <center><b>상세정보 보기</b></center>
            <div style={{display:'flex', justifyContent : 'center'}}>
              <ul>
                <li>미세먼지(PM10) 농도 : {today.pm10value}</li>
                <li>초미세먼지(PM2.5)농도 : {today.pm25value} </li>
                <li>미세먼지 등급 : {today.pm10grade} </li>
                <li>초미세먼지 등급 : {today.pm25grade} </li>
                <li>이산화가스 농도 : {today.so2value} </li>
                <li>일산화탄소 농도 : {today.covalue} </li>
                <li>오존 농도 : {today.o3value} </li>
                <li>이산화질소 농도 : {today.no2value} </li>
                <li>이산화가스 지수 : {today.so2grade} </li>
                <li>일산화탄소 지수 : {today.cograde} </li>
                <li>오존 지수 : {today.o3grade} </li>
                <li>이산화질소 지수 : {today.no2grade} </li>
                <li>통합대기환경수치 : {today.khaivalue} </li>
                <li>통합대기환경지수 : {today.khaigrade}  </li>
                <li>측정시간 : {today.datatime}</li>
              </ul>
            </div>
            </div>            
          </div>
        </div>
      )
    
    }
    else {
      return(<div>Loading...</div>);
    }

    /*
    {"id":1,"stationname":"중구","datatime":"2018-08-09 16:00","so2value":"0.003","covalue":"0.2",
    "o3value":"0.046","no2value":"0.020","pm10value":"39","khaivalue":"66","khaigrade":"100","so2grade":"1",
    "cograde":"1","o3grade":"2","no2grade":"1","pm10grade":"2","lat":37.5640907,"lng":126.99794029999998}
    */
  
  }


}

export default Info;



// 함수형 버전

// import React from 'react';
// import './Info.css'

// const Info = ({data}) => {
//   data = data[0]
//   let result = null
//   /*
//   {"id":1,"stationname":"중구","datatime":"2018-08-09 16:00","so2value":"0.003","covalue":"0.2",
//   "o3value":"0.046","no2value":"0.020","pm10value":"39","khaivalue":"66","khaigrade":"100","so2grade":"1",
//   "cograde":"1","o3grade":"2","no2grade":"1","pm10grade":"2","lat":37.5640907,"lng":126.99794029999998}
//   */

//   if(data.pm10value <= 15){
//     result = '최고!!'
//   }else if(data.pm10value <= 30){
//     result = "좋음"
//   }else if(data.pm10value <= 40){
//     result = "양호"
//   }else if(data.pm10value <= 50){
//     result = "보통"
//   }else if(data.pm10value <= 75){
//     result = "나쁨"
//   }else if(data.pm10value <= 100){
//     result = "상당히 나쁨"
//   }else if(data.pm10value <= 150){
//     result = "매우 나쁨"
//   }else{
//     result = "최악"
//   }


  
//   return (
//     <div className="info">
      
//       {data.stationname}의 오늘 공기는  
//       {result}({data.pm10value}㎍/㎥)   
      
//       <div>
//       미세먼지(PM10) 농도 : {data.pm10value} 
//       초미세먼지(PM2.5)농도 : {data.pm25value} 
//       미세먼지 등급 : {data.pm10grade} 
//       초미세먼지 등급 : {data.pm25grade} 
//       이산화가스 농도 : {data.so2value} 
//       일산화탄소 농도 : {data.covalue} 
//       오존 농도 : {data.o3value} 
//       이산화질소 농도 : {data.no2value} 
//       이산화가스 지수 : {data.so2grade} 
//       일산화탄소 지수 : {data.cograde} 
//       오존 지수 : {data.o3grade} 
//       이산화질소 지수 : {data.no2grade} 
//       통합대기환경수치 : {data.khaivalue} 
//       통합대기환경지수 : {data.khaigrade}  
//       </div>

//       측정시간 : {data.datatime}

      
    
//     </div>
//   );
// };

// export default Info;