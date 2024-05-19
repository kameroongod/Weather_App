import React, {useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { LineChart } from '@mui/x-charts/LineChart';


function Weather(props) {
    
    const [checked, isChecked] = useState(false);

    let xAxisLabel = [];
    let yAxis = [];
    let xAxis = [];

    return (
    <Box component="section" width="100%" sx={{textAlign:"center", display:"flex",alignItems:"flex-start"}}>
    <Card variant="outlined" sx={checked? {}:{backgroundImage:"Url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbMMfrh4j5BIGWGv2i0lTzvuZvY1aPy7gWw&s)"}}>
    <CardContent >
    <Typography sx={{fontWeight:"bold"}} color={checked? "text.secondary":"white"} gutterBottom noWrap={true}>
    {props.date}  
    </Typography>
    </CardContent>
    <CardActions  sx={{display:"flex-column", justifyContent:"center"}}>
    <Button component="label" variant="contained" size="small" onClick={()=> {
                   isChecked(prevValue => !prevValue)
                        }}>Get Forecast</Button>
    </CardActions>
      
        {checked && Object.values(props.forecasts).map(forecast=> {
                  return forecast.map((forecastDay, index) => {
                            
                            xAxis.push(index);
                            xAxisLabel.push(new Date(Date.parse(forecastDay.dt_txt)).toLocaleTimeString().replace(":00:00 ",""));
                            yAxis.push(parseFloat(forecastDay.main.temp));

                           return (
                            <CardContent>
                            <Typography variant="h8" sx={{fontWeight:"bold"}}>{props.city}</Typography>
                            <br/>
                            <Typography variant="h8">{new Date(Date.parse(forecastDay.dt_txt)).toLocaleTimeString().replace(":00:00 ","")}</Typography>
                            <Typography variant="h8"> ({forecastDay.main.temp}°C) </Typography>
                            <br/>
                            <img src={`https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`} className="logo-img"/>
                            <br/>
                             <Typography variant="h8"> {forecastDay.weather[0].description}</Typography>
                            </CardContent>)
                     })

                })}

                   {(checked && xAxis.length > 2) &&  <LineChart
                        xAxis={[{data:xAxisLabel, scaleType:'point', label:"Time"}]}
                        series={[{data: yAxis, label:"Temperature"}]}
                        height={250}
                        width={450}
                             />}
    </Card>
    </Box>
    )
}

export default Weather;