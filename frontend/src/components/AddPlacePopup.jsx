import { useState } from "react";
import { Popup } from "react-map-gl";

export default function MyPopup({
  longitude,
  latitude,
  closeAddPlacePopupHandler,
  addNewLoc,
}) {
  const [locNameInput, setLocNameInput] = useState(" ");
  const [locDescInput, setLocDescInput] = useState(" ");
  const [locRateInput, setLocRateInput] = useState(1);

  async function saveLoc() {
    try {
      const res = await fetch("/api/marks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: locNameInput,
          createdBy: "amir",
          desc: locDescInput,
          lat: latitude,
          long: longitude,
          rate: locRateInput,
        }),
      });
      const data = await res.json();
      addNewLoc(data);
    } catch (error) {
      console.log(error);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    saveLoc();
    closeAddPlacePopupHandler();
  }

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="top"
      closeOnClick={false}
      // onClose={()=>closeAddPlacePopupHandler()}
    >
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type={"text"}
          placeholder={"Location Name"}
          onChange={(e) => setLocNameInput(e.target.value)}
        />
        <textarea
          cols="21"
          rows="5"
          placeholder={"Description"}
          onChange={(e) => setLocDescInput(e.target.value)}
        ></textarea>
        {/* <input
          type={"number"}
          min="0"
          max="5"
          onChange={(e) => setLocRateInput(e.target.value)}
        /> */}
        <select onChange={(e) => setLocRateInput(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="submit" />
      </form>
    </Popup>
  );
}
