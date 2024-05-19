import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

 function CurrentCityWeather(props) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
        title={props.city}
      />
      <CardContent >
        <Typography gutterBottom variant="h6" component="div">
          {props.city}, {props.country} <br/>({props.temp}°C)
        </Typography>
        <Typography variant="body2" sx={{fontWeight:"bold" }}  color="text.secondary">
          {props.description}
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary">
          {new Date().toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CurrentCityWeather;