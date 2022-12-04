import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNewToll from "../components/Popup/AddNewToll";
import AddVehicleEntry from "../components/Popup/AddVehicleEntry";
import Table from "../components/Table";

function AllTolls() {
  const [searchToll, setSearchToll] = useState();
  const [addVehiclePopup, setAddVehiclePopup] = useState(false);
  const [addNewTollPopup, setAddNewTollPopup] = useState(false);
  const [tableData, setTableData] = useState();

  useEffect(() => {
    if (localStorage.getItem("toll_list")) {
      let table_data = JSON.parse(localStorage.getItem("toll_list"));
      setTableData(table_data);
    }
  }, [localStorage.getItem("toll_list")]);

  const table_head = Object.freeze([
    "TOLL NAME",
    "CAR/JEEP/VAN",
    "LCV",
    "TRUCK/BUS",
    "HEAVY VEHICLE",
  ]);

  function deleteRow(row) {
    let currentRow = tableData.filter(
      (data) => data.toll_name !== row.toll_name
    );
    localStorage.setItem("toll_list", JSON.stringify(currentRow));
    setTableData(currentRow);
  }
  return (
    <section>
      <div className="header header_alltolls">
        <h2>Tollgate List </h2>
        <div className="search_bar">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Search a toll"
            onChange={(e) => setSearchToll(e.target.value)}
          />
        </div>
        <div className="button_container">
          <Link to="/add-toll">
            <button>Add new toll</button>
          </Link>
          {/* <button onClick={() => setAddNewTollPopup(true)}>Add new toll</button>
          <Link to="/">
            <button>Back to vehicle logs</button>
          </Link> */}
        </div>
      </div>

      <Table
        head={table_head}
        datas={tableData}
        search={searchToll}
        searchfield="toll_name"
        deleteList={true}
        deleteRow={deleteRow}
        editList={true}
        editfield="toll_name"
      />
      {/* 
      <AddVehicleEntry
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

export default AllTolls;
