import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
// import Pagination from "./Pagination";
import { FaSort } from "react-icons/fa";

const AddForm = () => {
  const [data, setdata] = useState([]);
  const [originData, setoriginData] = useState([]);
  const [records, setRecords] = useState([]);
  const [UserType, setUserType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [pageNumbers, setpageNumbers] = useState([]);


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
    setdata((oldRecords) => [...oldRecords, data.user]);
  };

  useEffect(() => {
    axios.get("http://localhost:7700/type/").then((res) => {
      console.log("userstate called");
      const sorted = [...res.data.users].sort((a, b) =>
      a["UserType"].toLowerCase() > b["UserType"].toLowerCase() ? 1 : -1
      );
      setdata(sorted);
      setoriginData(sorted);
      setOrder("DSC");
      // setdata(res.data.users);
      setRecords(sorted.slice(0, 10));
      let numbers = [];
      for (let i = 1; i < Math.ceil(sorted.length / 10) + 1; i++) {
        numbers.push(i);
      }
      setpageNumbers(numbers);
    });
  }, []);


  const pageHandler = (pageNumber) => {
    setPageNumber(pageNumber);  
    setRecords(data.slice(pageNumber * 10 - 10, pageNumber * 10));
  };

  const sorting = (col) => {
    let sorted = [];
    if (order === "ASC") {
      sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted);

      setOrder("DSC");
    }
    if (order === "DSC") {
      sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted);
      setOrder("ASC");
    }
    setPageNumber(pageNumber);
    setRecords(sorted.slice(pageNumber * 10 - 10, pageNumber * 10));
  };

  const searchSort = (col) => {
    setSearch(col);
    let sortedData = [...originData].filter((d) =>
      d.UserType.toLowerCase().includes(col.toLowerCase())
    );
    let numbers = [];
    for (let i = 1; i < Math.ceil(sortedData.length / 10) + 1; i++) {
      numbers.push(i);
    }
    setpageNumbers(numbers);
    setdata(sortedData);
    setPageNumber(1);
    setRecords(sortedData.slice(1 * 10 - 10, 1 * 10));


  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h2 className="text-center mt-5">User Type Form</h2>
        <form className="form-css">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label field">
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

          <button
            type="submit"
            onClick={sendData}
            className="btn btn-primary submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="col-md-7 mt-5">
        <Container className="border">
          {(records || []).length > 0 ? (
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>
                    ID <FaSort onClick={() => sorting("_id")} />
                  </th>
                  <th>
                    Users <FaSort onClick={() => sorting("UserType")} />
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1 + (pageNumber - 1) * 10}</td>
                      <td>{item._id}</td>
                      <td>{item.UserType}</td>
                    </tr>
                  );
                })}
                {/* <br/> */}
              </tbody>
            </Table>
          ) : (
            // <div>
            //   {records.map((post) => (
            //     <div className="border">{post.UserType}</div>
            //   ))}
            //   <br />
            //   <Pagination data={data} pageHandler={pageHandler} />
            // </div>

            <div>
              <h3>No Data Found</h3>
            </div>
          )}
        </Container>
        {/* <Pagination data={data} pageHandler={pageHandler} /> */}
        <div>
          <center>
            {pageNumbers.map((page) => (
              <div
                className="btn btn-primary"
                onClick={() => pageHandler(page)}
              >
                {page}
              </div>
            ))}
          </center>
        </div>
        <br />
        <br />
      </div>
      <div>
        <center>
          <h4>Enter User</h4>
          <input
            type="text"
            value={search}
            onChange={(e) => searchSort(e.target.value)}
          />
          <br />
          {/* {data
            .filter((item) =>
              item.UserType.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => {
              return <div className="searchData">{item.UserType}</div>;
            })} */}
        </center>
      </div>
    </div>
  );
};

export default AddForm;
