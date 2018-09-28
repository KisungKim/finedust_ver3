import React, { Component } from 'react';
import './Info.css'

class Info extends Component {

  render() {

    const data = this.props.data[0]
    let result = null
    let background = null
    /*
    {"id":1,"stationname":"중구","datatime":"2018-08-09 16:00","so2value":"0.003","covalue":"0.2",
    "o3value":"0.046","no2value":"0.020","pm10value":"39","khaivalue":"66","khaigrade":"100","so2grade":"1",
    "cograde":"1","o3grade":"2","no2grade":"1","pm10grade":"2","lat":37.5640907,"lng":126.99794029999998}
    */
  
    if(data.pm10value <= 15){ 
      result = '최고^_^'
      background = "#d0ebff"      
    }else if(data.pm10value <= 30){
      result = "좋음"
      background = "#a5d8ff"
    }else if(data.pm10value <= 40){
      result = "양호"
      background = "#4dabf7"
    }else if(data.pm10value <= 50){
      result = "보통"
      background = "#63e6be"
    }else if(data.pm10value <= 75){
      result = "나쁨"
      background = "#ffe066"
    }else if(data.pm10value <= 100){
      result = "상당히 나쁨"
      background = "#fcc419"      
    }else if(data.pm10value <= 150){
      result = "매우 나쁨"
      background = "#f08c00"
    }else{
      result = "최악"
      background = "#212529"
    }

    return (
      <div className="info">        
        <div className="main">
          <h2>{data.stationname}의 오늘 공기는</h2>
            
          <h1>{result} ({data.pm10value} ㎍/㎥) </h1>        
          <center><div style={{background, width:'100px', height:'100px', borderRadius:'50px'}}></div></center>
            
        </div>
        
        <div className="middle">
          <p>어제보다~~</p>
          <p>그제보다~~</p>
          <p>ㅁㅁ보다~~</p>

        </div>






        {/* 상세정보 포함 */}
        <div className="details">
          <div className="dropbtn">
            <center><b>상세정보 보기</b></center>
          <div style={{display:'flex', justifyContent : 'center'}}>
            <ul>
              <li>미세먼지(PM10) 농도 : {data.pm10value}</li>
              <li>초미세먼지(PM2.5)농도 : {data.pm25value} </li>
              <li>미세먼지 등급 : {data.pm10grade} </li>
              <li>초미세먼지 등급 : {data.pm25grade} </li>
              <li>이산화가스 농도 : {data.so2value} </li>
              <li>일산화탄소 농도 : {data.covalue} </li>
              <li>오존 농도 : {data.o3value} </li>
              <li>이산화질소 농도 : {data.no2value} </li>
              <li>이산화가스 지수 : {data.so2grade} </li>
              <li>일산화탄소 지수 : {data.cograde} </li>
              <li>오존 지수 : {data.o3grade} </li>
              <li>이산화질소 지수 : {data.no2grade} </li>
              <li>통합대기환경수치 : {data.khaivalue} </li>
              <li>통합대기환경지수 : {data.khaigrade}  </li>
              <li>측정시간 : {data.datatime}</li>
            </ul>
          </div>
          </div>            
        </div>
  
      
  
        
      
      </div>
    )
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