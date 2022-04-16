import React, { useLayoutEffect, useState } from "react";
import Map from "./components/Map";
import Select from "./components/Select";

const App = () => {

    const [annee, setAnnee] = useState('');
    const [arr, setArr] = useState('');
    const [movieName, setMovieName] = useState('');
    const [producerName, setProducerName] = useState('');
    const [directorName, setDirectorName] = useState('');

    return (
        <div class="title">
          <h1>Recherchez les films et séries tournés à Paris</h1>
          <div className="map-form">
            <Map annee={annee} arr={arr} movieName={movieName} directorName={directorName} producerName={producerName}/>
            <Select setAnnee={setAnnee} setArr={setArr} setMovieName={setMovieName} setProducerName={setProducerName} setDirectorName={setDirectorName}/>
          </div>
        </div>
    );
};

export default App;
