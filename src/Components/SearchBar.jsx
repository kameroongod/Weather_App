import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

function SearchBar(props) {

const link = (
    <Link href="https://www.iso.org/obp/ui/fr/#search" target="_blank" rel="noopener noreferrer" color="#CCCC" variant="caption">
        this link
    </Link>
    );
      
    return (
        <div>
        <Typography variant="h2" className="searchBarTitle">Get weather in your location</Typography>
        <form className="inputForm">
         <TextField id="outlined-helperText" label="City Name" name="city" defaultValue={props.values.name? props.values.name: " "}/>
         <Tooltip interactive title={<span>For a list of country codes, refer to {link}</span>}>
            <TextField id="outlined-helperText" label="Country Code" name="country" defaultValue={props.values.country? props.values.country: " "}/>
         </Tooltip>
         <TextField id="outlined-helperText" label="State Name (required for US)" name="state" defaultValue ={props.values.state? props.values.state: " "}/>
         <Button variant="contained" onClick={async ()=> {
            const city = document.querySelector("[name=city]").value;
            const state = document.querySelector("[name=state]").value;
            const country = document.querySelector("[name=country]").value;
            {await props.Coords(city,country,state)};
            {await props.Weather()};
            }}>Search</Button>
            </form>
            <br/>
            <Container sx={{display:"flex", gap:"5px", justifyContent:"center"}}>
            <Button variant="contained" onClick={async () => {await props.currentCity()}}>Get current City</Button>
            <Button variant="contained" onClick={async () => {
                const city = document.querySelector("[name=city]").value;
                const state = document.querySelector("[name=state]").value;
                const country = document.querySelector("[name=country]").value;
                {await props.Coords(city,country,state)};
                {await props.forecast()};
                }}>Get Forecast</Button>
             </Container>
            </div>
    )

}


export default SearchBar;