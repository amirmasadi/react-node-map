import { Popup } from "react-map-gl";
import StarIcon from "./StarIcon";
import { format } from "timeago.js";

export default function MyPopup({
  longitude,
  latitude,
  title,
  description,
  rate,
  createdAt,
  createdBy,
  popupCloseHandler,
}) {
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="top"
      closeOnClick={false}
      closeButton={true}
      focusAfterOpen={false}
      // onClose={() => popupCloseHandler()}
    >
      <div>
        <h3 className="title">{title}</h3>
        <p className="desc">{description}</p>
        <div className="rating">
          {Array(rate).fill(<StarIcon key={latitude} />)}
        </div>
        <p className="created-at">{format(createdAt)}</p>
        <p className="craeted-by">by {createdBy}</p>
      </div>
    </Popup>
  );
}
