import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNewToll from "../components/Popup/AddNewToll";
import AddVehicleEntry from "../components/Popup/AddVehicleEntry";
import Table from "./../components/Table";

function Home() {
  const [searchVehicle, setSearchVehicle] = useState();
  const [addVehiclePopup, setAddVehiclePopup] = useState(false);
  const [addNewTollPopup, setAddNewTollPopup] = useState(false);
  const [tableData, setTableData] = useState();
  const [filterActive, setFilterActive] = useState(false);
  const [tollList, setTollList] = useState();
  const [tariff, setTariff] = useState();
  const [filterTollname, setFilterTollname] = useState();

  useEffect(() => {
    let toll_list = JSON.parse(localStorage.getItem("toll_list"));
    setTollList(toll_list);
  }, [localStorage.getItem("toll_list")]);

  useEffect(() => {
    if (localStorage.getItem("vehicle_entries")) {
      let table_data = JSON.parse(localStorage.getItem("vehicle_entries"));
      setTableData(table_data);
    }
  }, [localStorage.getItem("vehicle_entries")]);

  const table_head = Object.freeze([
    "VEHICLE TYPE",
    "VEHICLE NUMBER",
    "DATE/TIME",
    "TOLL NAME",
    "TARIEF",
  ]);
  return (
    <section>
      <div className="header">
        <h2>Toll entries / Vehicle entries</h2>
        {/* <div className="filter_icon">
          <i
            className="fa fa-filter"
            onClick={() => setFilterActive(!filterActive)}
          ></i>
          {filterActive && (
            <div className="tollname_filter">
              <div
                className={`filter_list ${
                  !filterTollname && "active_filter_list"
                }`}
                onClick={() => setFilterTollname()}
              >
                All
              </div>
              {tollList?.map((toll) => (
                <div
                  className={`filter_list ${
                    filterTollname?.toll_name === toll?.toll_name &&
                    "active_filter_list"
                  }`}
                  onClick={() => setFilterTollname(toll)}
                >
                  {toll.toll_name}
                </div>
              ))}
            </div>
          )}
        </div> */}

        <div className="search_bar">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Search Vehicle"
            onChange={(e) => setSearchVehicle(e.target.value)}
          />
        </div>
        <div className="button_container">
          {/*  <button onClick={() => setAddVehiclePopup(true)}>
            Add Vehicle entry
          </button>
          <button onClick={() => setAddNewTollPopup(true)}>Add new toll</button>*/}
          <Link to="/add-vehicle">
            <button>Add Vehicle entry</button>
          </Link>
        </div>
      </div>

      <Table
        head={table_head}
        datas={tableData}
        search={searchVehicle}
        searchfield="vehicle_number"
        filter={filterTollname?.toll_name}
        filterfield="toll_name"
      />

      {/* <AddVehicleEntry
        addVehiclePopup={addVehiclePopup}
        setAddVehiclePopup={setAddVehiclePopup}
      />
      <AddNewToll
        addNewTollPopup={addNewTollPopup}
        setAddNewTollPopup={setAddNewTollPopup}
      /> */}
    </section>
  );
}

export default Home;
