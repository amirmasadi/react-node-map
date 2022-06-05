import Map from "react-map-gl";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MyMarker from "./components/MyMarker";
import MyPopup from "./components/MyPopup";
import AddPlacePopup from "./components/AddPlacePopup";
import Coordinate from "./components/Coordinate";

export default function App() {
  const [viewState, setViewState] = useState({
    longitude: 52.1557,
    latitude: 34.9713,
    zoom: 4.3,
  });
  const [places, setPlaces] = useState();
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(null);
  const [currnetLatLong, setCurrentLatLong] = useState(null);
  const [dblClickLatLong, setDblClickLatLong] = useState(null);

  async function getPlaces() {
    const response = await fetch("/api/marks");
    const data = await response.json();
    setPlaces(data);
  }

  function popupHandler(id) {
    setCurrentPlaceId(id);
  }

  const closeAddPlacePopupHandler = () => {
    setDblClickLatLong(null);
  };

  const popupCloseHandler = () => {
    setCurrentPlaceId(null);
  };

  function addNewLoc(newLoc) {
    setPlaces([...places, newLoc]);
  }

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      <Map
        initialViewState={{ ...viewState }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/amasadi/cl1hh9xgn000d14o3d4jhons4"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onZoom={(e) => setCurrentZoom(e.viewState.zoom)}
        onDrag={(e) => {
          setCurrentLatLong({
            lat: e.viewState.latitude,
            long: e.viewState.longitude,
          });
        }}
        onDblClick={(e) =>
          setDblClickLatLong({ lat: e.lngLat.lat, long: e.lngLat.lng })
        }
      >
        {places &&
          places.map((p) => (
            <div key={p._id}>
              <MyMarker
                longitude={p.long}
                latitude={p.lat}
                clickHandler={() => popupHandler(p._id)}
              />
              {p._id === currentPlaceId && (
                <MyPopup
                  longitude={p.long}
                  latitude={p.lat}
                  title={p.title}
                  description={p.desc}
                  rate={p.rate}
                  createdAt={p.createdAt}
                  createdBy={p.createdBy}
                  popupCloseHandler={popupCloseHandler}
                />
              )}
            </div>
          ))}

        {dblClickLatLong && (
          <AddPlacePopup
            longitude={dblClickLatLong.long}
            latitude={dblClickLatLong.lat}
            closeAddPlacePopupHandler={closeAddPlacePopupHandler}
            addNewLoc={addNewLoc}
          />
        )}
      </Map>
      <Coordinate currentZoom={currentZoom} currnetLatLong={currnetLatLong} />
    </>
  );
}
