import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
// import Pagination from "./Pagination";
import { FaSort, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const AddForm = () => {
  const [data, setdata] = useState([]);
  const [originData, setoriginData] = useState([]);
  const [records, setRecords] = useState([]);
  const [UserType, setUserType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [pageNumbers, setpageNumbers] = useState([]);

  const [editShow, SetEditShow] = useState(false); //edit
  const [rowData, setRowData] = useState([]); //edit
  const [rowId, setRowId] = useState(0); //edit

  const hanldeEditClose = () => {
    SetEditShow(false);
    setUserType("");
  };

  // {
  //   Update Method
  // }

  function updateModel(item) {
    setRowData(item);
    setRowId(item._id);
    SetEditShow(true);
    setUserType(item.UserType);
  }

  const handleEditSubmit = async (e) => {
    // e.preventDefault();
    // var regPhone = /^\d{10}$/;
    // if (PhoneNumber == "" || !regPhone.test(PhoneNumber)) {
    // alert("Please enter valid phone number.");
    // PhoneNumber.focus();
    // return false;
    // } // Javascript reGex for Phone Number validation.
    // var regName = /\d+$/g;
    // if (Name == "" || regName.test(Name)) {
    // window.alert("Please enter your name properly.");
    // Name.focus();
    // return false;
    // } // Javascript reGex for Name validation
    //else {

    axios
      .put("http://localhost:7700/type/" + rowId, {
        UserType,
      })
      .then((response) => {
        alert("Student details is updated");

        console.log(response);
      });

    //}

    toast.success("user updated");
  };

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
    getUsers();
  },[]);

  function getUsers(){
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
  }

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

  // const deleteUser = (id) => {
  //   axios
  //     .delete(`http://localhost:7700/type/${id}`)
  //     .then((res) => {
  //       console.log("User Deleted");
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

  function deleteUser(id) {

    fetch(`http://localhost:7700/type/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <h2 className="text-center bg-dark text-white ">Users Data</h2>
        <form className="form-css">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label field">
              <h5>User Name</h5>
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

      <div className="col-md-7 mt-2">
        <Container className="border borderBox-css">
          <br />
          <div>
            <h4>Enter User</h4>
            <input
              type="text"
              value={search}
              onChange={(e) => searchSort(e.target.value)}
            />
          </div>{" "}
          <br />
          {(records || []).length > 0 ? (
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>S.No.</th>
                  {/* <th>
                    ID <FaSort onClick={() => sorting("_id")} />
                  </th> */}
                  <th>
                    Users <FaSort onClick={() => sorting("UserType")} />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1 + (pageNumber - 1) * 10}</td>
                      {/* <td>{item._id}</td> */}
                      <td>{item.UserType}</td>
                      <td>
                        <button className="btn btn-warning me-2"
                        onClick={()=>{updateModel(item)}}>
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(item._id)}
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div>
              <h3>No Data Found</h3>
            </div>
          )}
        </Container>
        <br></br>

        <div className='model-box-view'>
          <Modal
            show={editShow}
            onHide={hanldeEditClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <Form onSubmit={handleEditSubmit}>
                  <Row>
                    <Col lg={12} sm={12} md={12}>
                      <label>User Name</label>
                      <input type="text" onChange={(e) => setUserType(e.target.value)} style={{ marginLeft: "20px" }} placeholder="Enter a User Name" required defaultValue={rowData.Menutype} />
                    </Col>
                  </Row>
                  <Row className="button" >
                    <Col lg={12} sm={12} md={12}>
                      <Button type="submit" style={{ margin: "15px" }}>Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>



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
        </div>
        </div>
  );
};

export default AddForm;
