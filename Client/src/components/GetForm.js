import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Form from "./Form";

const GetForm = () => {
  const [records, setrecords] = useState([]);

  console.log(records);

  useEffect(() => {
    axios.get("http://localhost:7700/type/").then((res) => setrecords(res.data));
  },[]);

  return (
    <div>
      <Container className="border">
        {(records.users || []).length > 0 ? (
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>S.No.</th>

                <th>Users</th>
              </tr>
            </thead>

            <tbody>
              {records.users.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>

                    <td>{item.UserType}</td>
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
      <Form/>
    </div>
  );
};

export default GetForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table } from "react-bootstrap";
// import Form from "../components/Form";

// function Dropdown() {
//   const [name, setName] = useState([]);
//   const [singleUser, setSingleUser] = useState([]);

//   useEffect(function () {
//     axios
//       .get("http://localhost:7700/type/")
//       .then((response) => setName(response.data))
//       .then((error) => console.log(error));
//   }, []);

//   const onddlChange = (e) => {
//     axios
//       .get("http://localhost:7700/type/" + e.target.value)
//       .then((response) => setSingleUser(response.data))
//       .then((error) => console.log(error));
//   };

//   return (
//     <div>
//       {/* <select className="form-control col-md-3" onChange={onddlChange}>
//         <option value="0">----Select User----</option>
//         {name.map((users) => (
//           <option key={name.id} value={name.id}>
//             {name.UserType}
//           </option>
//         ))}
//       </select> */}
//       <br />
//       <br />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <td>ID</td>
//             <td>Users</td>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{singleUser.id}</td>
//             <td>{singleUser.UserType}</td>
//           </tr>
//         </tbody>
//       </Table>
//       <Form />
//     </div>
//   );
// }

// export default Dropdown;
