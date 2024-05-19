import React from "react";
import Typography from '@mui/material/Typography';

function Footer(props) {
   
  return (
    <footer className={props.forecast? "footer":"footer fixed"}>
      <Typography variant="body2"> Copyright © {new Date().getFullYear()} 
      <br/> Made by Kameroongod, Powered by <t/> 
       <a href="https://openweathermap.org/" target="_blank" 
       rel="noopener noreferrer">OpenWeatherMap</a> API </Typography>
      </footer>
    )
}

export default Footer;