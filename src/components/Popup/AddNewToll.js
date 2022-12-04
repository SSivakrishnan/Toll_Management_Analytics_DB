import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Modal from "../Modal";

function AddNewToll({ addNewTollPopup, setAddNewTollPopup }) {
  const history = useHistory();

  const [values, errors, onChange, onSubmit] = useForm(dataAdded, {}, validate);

  const [vehicleTypes, setVehicleTypes] = useState([
    "Car/Jeep/Van",
    "LCV",
    "Truck/Bus",
    "Heavy vehicle",
  ]);

  function dataAdded() {
    console.log({ values });
    for (let i = 1; i < 5; i++) {
      var car_jeep_van;
      var lcv;
      var truck_bus;
      var heavy_vehicle;

      if (values["vehicle_type_" + i] === "Car/Jeep/Van") {
        car_jeep_van = `${values["single_journey_" + i]}/${
          values["return_journey_" + i]
        }`;
      }
      if (values["vehicle_type_" + i] === "LCV") {
        lcv = `${values["single_journey_" + i]}/${
          values["return_journey_" + i]
        }`;
      }
      if (values["vehicle_type_" + i] === "Truck/Bus") {
        truck_bus = `${values["single_journey_" + i]}/${
          values["return_journey_" + i]
        }`;
      }
      if (values["vehicle_type_" + i] === "Heavy vehicle") {
        heavy_vehicle = `${values["single_journey_" + i]}/${
          values["return_journey_" + i]
        }`;
      }
    }
    const newData = {
      //_id:new Date().valueOf(),
      toll_name: values.toll_name,
      car_jeep_van: car_jeep_van,
      lcv: lcv,
      truck_bus: truck_bus,
      heavy_vehicle: heavy_vehicle,
    };
    localStorage.setItem(
      "toll_list",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("toll_list")) ?? []),
        newData,
      ])
    );
    history.push("/all-tolls");
  }
  function validate(values) {
    let errors = {};
    if (!values?.["toll_name"]?.trim()?.length > 0) {
      errors["toll_name"] = "Enter Toll name";
    }
    for (let i = 1; i < 5; i++) {
      let vehicleType = values?.[`vehicle_type_${i}`]?.trim();
      let singleJourney = values?.[`single_journey_${i}`]?.trim();
      let returnJourney = values?.[`return_journey_${i}`]?.trim();
      if (!vehicleType?.length > 0) {
        errors[`vehicle_type_${i}`] = `Enter Vehicle Type ${i}`;
      }
      if (isNaN(+singleJourney)) {
        errors[`single_journey_${i}`] = `Enter Number Only`;
      }
      if (!singleJourney?.length > 0) {
        errors[`single_journey_${i}`] = `Enter Single Journey ${i}`;
      }
      if (isNaN(returnJourney)) {
        errors[`return_journey_${i}`] = `Enter Number Only`;
      }
      if (!returnJourney?.length > 0) {
        errors[`return_journey_${i}`] = `Enter Return Journey ${i}`;
      }
    }
    let compare_12 = values?.[`vehicle_type_1`] === values?.[`vehicle_type_2`];
    let compare_23 = values?.[`vehicle_type_2`] === values?.[`vehicle_type_3`];
    let compare_34 = values?.[`vehicle_type_3`] === values?.[`vehicle_type_4`];
    let compare_41 = values?.[`vehicle_type_4`] === values?.[`vehicle_type_1`];
    if (compare_12 || compare_23 || compare_34 || compare_41) {
      errors[`compare_vehicle`] = `Vehicle must be Unique`;
    }

    return errors;
  }

  return (
    <>
      <h2>Add New Toll</h2>
      <div className="form_field">
        <label>Toll Name*</label>
        <input
          type="text"
          placeholder="Enter toll name"
          name="toll_name"
          onChange={onChange}
        />
        <p className="err_msg">{errors["toll_name"]}</p>
      </div>
      <label>Vehicle fare Details*</label>

      {[...Array(4)].map((num, i) => (
        <div className="form_field form_field_row">
          <div>
            <select
              id={"vehicle_type_" + (i + 1)}
              name={"vehicle_type_" + (i + 1)}
              onChange={onChange}
            >
              <option selected disabled>
                Select Vehicle
              </option>
              {vehicleTypes.map((vehicle, i) => (
                <option className={"vehicle" + i} key={i} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
            <p className="err_msg">{errors["vehicle_type_" + (i + 1)]}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Single Journey"
              name={"single_journey_" + (i + 1)}
              onChange={onChange}
            />
            <p className="err_msg">{errors["single_journey_" + (i + 1)]}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Return Journey"
              name={"return_journey_" + (i + 1)}
              onChange={onChange}
            />
            <p className="err_msg">{errors["return_journey_" + (i + 1)]}</p>
          </div>
        </div>
      ))}
      <p className="err_msg" style={{ position: "relative", bottom: "0" }}>
        {errors["compare_vehicle"]}
      </p>

      <button onClick={onSubmit}>Add Details</button>
    </>
  );
}

export default AddNewToll;
