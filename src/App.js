import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CountrySelect from "./components/CountrySelect";
import DataShowcase from "./components/DataShowcase";
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import WorldChart from "./components/WorldChart";
import "./styles/App.css";
import "leaflet/dist/leaflet.css";
export default function App() {
   const [country, setCountry] = useState("global");
   const [zoom, setZoom] = useState(2);
   const [center, setCenter] = useState([40, 34]);

   const theme = createTheme({
      palette: {
         primary: {
            main: "#F5F5F5",
         },
         secondary: {
            main: "#D5E8D4",
         },
      },
   });

   async function handleCountryChange(e) {
      setCountry(e.target.value);
      let url;
      if (e.target.value === "global") {
         setCenter([40, 34]);
         setZoom(2);
      } else {
         url = `/v3/covid-19/countries/${e.target.value}`;
         await fetch(url)
            .then((res) => res.json())
            .then((data) => {
               setCenter([data.countryInfo.lat, data.countryInfo.long]);
               setZoom(6);
            });
      }
   }

   return (
      <ThemeProvider theme={theme}>
         <Container maxWidth="lg" component="div" className="app" color="error">
            <Box className="main_body">
               <Container maxWidth="md">
                  <div className="app__flex_top">
                     <Header />
                     <CountrySelect onCountryChange={handleCountryChange} />
                  </div>
                  <DataShowcase country={country} />
                  <div className="app__flex">
                     <Map center={center} zoom={zoom} />
                     <Table />
                  </div>
                  <WorldChart country={country} />
               </Container>
            </Box>
         </Container>
      </ThemeProvider>
   );
}
