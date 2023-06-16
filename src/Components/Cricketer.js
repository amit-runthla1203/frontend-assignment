import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import getPlayers from "../get-players";
import { SET_CRICKETER_DATA } from "../Store/Action";
import CustomeTablePagination from "./Common/CustomeTablePagination";

const Cricketers = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const [players, setPlayers] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async () => {
    const playersData = await getPlayers();
    dispatch({ type: SET_CRICKETER_DATA, payload: playersData });
    setPlayers(playersData);
  };

  useEffect(() => {
    const filterValue = localStorage.getItem("filterValue") || "";
    const SearchValue = localStorage.getItem("searchValue") || "";
    setFilterBy(filterValue);
    setSearchValue(SearchValue);
    fetchData();
  }, []);

  const handleSort = sortOption => {
    setSortBy(sortOption);
  };

  const handleFilter = filterOption => {
    setFilterBy(filterOption);
  };

  const handleSearch = event => {
    localStorage.setItem("searchValue", event.target.value);
    setSearchValue(event.target.value);
  };

  const filteredPlayers = players.filter(player => {
    if (filterBy && player.type !== filterBy) {
      return false;
    }

    if (
      searchValue &&
      !(
        player.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        player.type.toLowerCase().includes(searchValue.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  const sortedPlayers = filteredPlayers.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "rank") {
      return a.rank - b.rank;
    }
    if (sortBy === "age") {
      return a.dob - b.dob;
    }
    return 0;
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cricketers</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: 10,
          flexWrap: "wrap"
        }}
      >
        <label>
          <b>Sort By:</b>
          <select
            style={{
              marginLeft: 5,
              width: "150px",
              border: "1px solid #aaa",
              height: 35,
              borderRadius: 5,
              padding: 2
            }}
            value={sortBy}
            onChange={e => {
              handleSort(e.target.value);
            }}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="rank">Rank</option>
            <option value="age">Age</option>
          </select>
        </label>
        <label>
          <b>Filter By:</b>
          <select
            style={{
              marginLeft: 5,
              width: "150px",
              border: "1px solid #aaa",
              height: 35,
              borderRadius: 5,
              padding: 2
            }}
            value={filterBy}
            onChange={e => {
              localStorage.setItem("filterValue", e.target.value);
              handleFilter(e.target.value);
            }}
          >
            <option value="">None</option>
            <option value="batsman">Batsman</option>
            <option value="bowler">Bowler</option>
            <option value="allRounder">All-Rounder</option>
            <option value="wicketKeeper">Wicket Keeper</option>
          </select>
        </label>
        <label>
          <b>Search:</b>
          <input
            style={{
              marginLeft: 5,
              width: "200px",
              border: "1px solid #aaa",
              height: 30,
              borderRadius: 5,
              padding: 2
            }}
            placeholder="Search by Name or Type"
            type="text"
            value={searchValue}
            onChange={handleSearch}
          />
        </label>
      </div>
      <CustomeTablePagination rows={sortedPlayers} />
    </div>
  );
};

export default Cricketers;
