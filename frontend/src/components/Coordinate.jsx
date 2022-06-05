import "./coordinates.moudle.css";

export default function Coordinate({ currentZoom, currnetLatLong }) {
  return (
    <div className="coordinates">
      <p className="zoom">Zoom: {currentZoom ? currentZoom.toFixed(4) : 0}</p>
      <p className="lat">
        Lat: {currnetLatLong ? currnetLatLong.lat.toFixed(4) : 0}
      </p>
      <p className="long">
        Long: {currnetLatLong ? currnetLatLong.long.toFixed(4) : 0}
      </p>
    </div>
  );
}
