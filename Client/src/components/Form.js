import React, { useState } from "react";
import { toast } from "react-toastify";

const Form = () => {
  let [UserType, setUserType] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:7700/type/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        UserType,
      }),
    });

    const data = await res.json();
    toast.success("user added");
    setUserType("");
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-center mt-3">User Type Form</h2>
      <form className="form-css">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            <h5>User Type</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={UserType}
            onChange={(e) => setUserType(e.target.value)}
          />
        </div>

        <button type="submit" onClick={sendData} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
