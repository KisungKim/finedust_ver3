import React from 'react';
import './Loading.css'

const Loading = ({pageHeight, logoWidth}) => {

  const divStyle = {
    display : "flex",
    height : `${pageHeight}vh`,
    justifyContent: "center",
    alignItems: "center",
  }
    
  const imgStlye = {
    width : `${logoWidth}px`,
    height : `${logoWidth}px`,
  }

  return (
    <div className="loading" style={divStyle}>
      <img style={imgStlye} id="cloud "src="http://download.seaicons.com/icons/iconsmind/outline/512/Cloud-icon.png" />
    </div>
  );
};

export default Loading;