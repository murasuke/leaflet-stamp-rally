import React, { VFC, useState, useEffect } from "react";
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet, { LatLng } from "leaflet";
import "./utils/initLeaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { distance, polylineDistance } from "./utils/distance";
import LocationMarker from "./LocationMarker";

const App: VFC = () => {
  const [location, setLocation] = useState<LatLngLiteral>();
  useEffect(() => {
    // 現在位置を取得
    navigator.geolocation.getCurrentPosition((e) => {
      const { latitude: lat, longitude: lng } = e.coords;
      setLocation({ lat, lng });
    });
  });

  const posArray = [
    new LatLng(35.17240429491713, 136.90829618386277), // 名古屋テレビ等
    new LatLng(35.17378994170568, 136.90291030851273), // 名古屋支社
    new LatLng(35.18468656654493, 136.899709270249), // 名古屋城
  ];

  useEffect(() => {
    // 距離を算出、一番近い場所をconsole.log()に表示する
    if (location) {
      const dists = posArray.map((item) => {
        return polylineDistance([location, item]);
      });
      dists.forEach((item) => console.log(dists));
    }
  }, [location]);

  if (!location) return null;

  return (
    <div className="App">
      <MapContainer center={posArray[0]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
          url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
        />
        {posArray.map((pos, i) => (
          <Marker
            position={pos}
            icon={Leaflet.icon({
              iconUrl: `c${i + 1}.png`,
            })}
          >
            <Popup>スタンプラリー#{i + 1}</Popup>
          </Marker>
        ))}
        <LocationMarker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default App;
