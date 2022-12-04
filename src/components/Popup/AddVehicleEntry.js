import React, { memo, useEffect, useState } from "react";
import Modal from "../Modal";
import useForm from "./../../hooks/useForm";
import { useHistory } from "react-router-dom";

function AddVehicleEntry({ addVehiclePopup, setAddVehiclePopup }) {
  const history = useHistory();

  const [values, errors, onChange, onSubmit] = useForm(dataAdded, {}, validate);

  const [tollList, setTollList] = useState();
  const [vehicleList, setVehicleList] = useState();
  const [tariff, setTariff] = useState();

  useEffect(() => {
    let toll_list = JSON.parse(localStorage.getItem("toll_list"));
    setTollList(toll_list);
  }, [localStorage.getItem("toll_list")]);

  useEffect(() => {
    if (localStorage.getItem("vehicle_entries")) {
      let table_data = JSON.parse(localStorage.getItem("vehicle_entries"));
      setVehicleList(table_data);
    }
  }, [localStorage.getItem("vehicle_entries")]);

  useEffect(() => {
    if (values?.vehicle_type && values.vehicle_number) {
      let fullTariff = tollList
        ?.find((toll) => toll.toll_name === values?.toll_name)
        ?.[
          `${values?.["vehicle_type"]
            ?.toLowerCase()
            ?.replaceAll("/", "_")
            ?.replaceAll(" ", "_")}`
        ]?.split("/");
      let isUserVisited = vehicleList?.find(
        (vehicle) => vehicle?.vehicle_number === values?.vehicle_number
      );
      console.log("valllllllll", isUserVisited);
      if (isUserVisited) {
        setTariff(fullTariff[1]);
      } else {
        setTariff(fullTariff[0]);
      }

      //console.log("terrihhh",`${values?.['vehicle_type']?.toLowerCase()?.replaceAll('/','_')?.replaceAll(' ','_')}`)
    }
  }, [values.vehicle_type, values.vehicle_number]);

  function getCurrentDate() {
    var currentdate = new Date();
    var datetime =
      "" +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  }

  function dataAdded() {
    localStorage.setItem(
      "vehicle_entries",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("vehicle_entries")) ?? []),
        {
          vehicle_type: values["vehicle_type"],
          vehicle_number: values["vehicle_number"],
          date: getCurrentDate(),
          toll_name: values["toll_name"],
          tariff,
        },
      ])
    );
    setTariff();
    history.push("/");
  }
  function validate(values) {
    let errors = {};
    if (!values?.["toll_name"]?.trim()?.length > 0) {
      errors["toll_name"] = "Select Toll name";
    }
    if (!values?.["vehicle_type"]?.trim()?.length > 0) {
      errors["vehicle_type"] = "Select vehicle Type ";
    }
    if (!values?.["vehicle_number"]?.trim()?.length > 0) {
      errors["vehicle_number"] = "Enter Vehicle Number";
    }
    return errors;
  }

  const vehicleType = ["Car/Jeep/Van", "LCV", "Truck/Bus", "Heavy vehicle"];

  return (
    <>
      <h2>Add New Entry</h2>
      <div className="form_field">
        <label>Select toll name*</label>
        <select name="toll_name" onChange={onChange}>
          <option selected disabled>
            Select Toll Name
          </option>
          {tollList?.map((toll) => (
            <option value={toll.toll_name}>{toll.toll_name}</option>
          ))}
        </select>
        <p className="err_msg">{errors["toll_name"]}</p>
      </div>
      <div className="form_field">
        <label>Select Vehicle Type*</label>
        <select name="vehicle_type" onChange={onChange}>
          <option selected disabled>
            Select Vehicle
          </option>
          {vehicleType.map((vehicle) => (
            <option value={vehicle}>{vehicle}</option>
          ))}
        </select>
        <p className="err_msg">{errors["vehicle_type"]}</p>
      </div>
      <div className="form_field">
        <label>Vehicle Number*</label>
        <input
          type="text"
          placeholder="Enter Your login id"
          name="vehicle_number"
          onChange={onChange}
        />
        <p className="err_msg">{errors["vehicle_number"]}</p>
      </div>
      <div className="form_field">
        <label>Tariff*</label>
        <input
          type="text"
          placeholder="Tariff amount"
          name="tariff"
          value={tariff}
          onChange={onChange}
          disabled
        />
      </div>
      <button onClick={onSubmit}>Add Entry</button>
    </>
  );
}

export default AddVehicleEntry;
