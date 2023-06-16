import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { calculateAge } from "../get-players";

const CricketerDetails = () => {
  const { playerId } = useParams();
  const playersData = useSelector(state => state?.cricketerData);
  const player = playersData.find(player => player.id === playerId) || {};

  const dateFormat = timestamp => {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ margin: "auto" }}>
      <Link style={{ margin: 10 }} to="/">
        Back to Cricketers
      </Link>
      <h2 style={{ textAlign: "center" }}>Cricketer Details</h2>
      {player ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <div style={{ padding: 5 }}>
            <b>Name:</b> {player.name}
          </div>
          <div style={{ padding: 5 }}>
            <b>Description:</b> {player.description}
          </div>
          <div style={{ padding: 5 }}>
            <b>Type:</b> {player.type}
          </div>
          <div style={{ padding: 5 }}>
            <b>Points:</b> {player.points}
          </div>
          <div style={{ padding: 5 }}>
            <b>Rank:</b> {player.rank}
          </div>
          <div style={{ padding: 5 }}>
            <b>Date of birth:</b> {dateFormat(player.dob)}
          </div>
          <div style={{ padding: 5 }}>
            <b>Age:</b> {calculateAge(player.dob)}
          </div>
        </div>
      ) : (
        <div>Cricketer not found!</div>
      )}
    </div>
  );
};

export default CricketerDetails;
