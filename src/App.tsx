import React, { VFC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet, { LatLng } from "leaflet";
import "./utils/initLeaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App: VFC = () => {
  const position = new LatLng(35.3607411, 138.727262); // 富士山頂

  return (
    <div className="App">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
          url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={Leaflet.icon({
            iconUrl: "https://www.achiachi.net/blog/_outside/mapicon/c1.png",
          })}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
