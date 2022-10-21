import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";

const FilterDate = () => {
  const [tickets, SetTickets] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/tickets").then((response) => {
      SetTickets(response.data);
    });
  }, []);

  
  

  //remove duplicate from list
  const statusDropDownList = () => {
    return [...new Set(tickets.map((item) => item.status))];
  };

  const status = statusDropDownList();

  //remove duplicate from list
  const assignedToDropDownList = () => {
    return [...new Set(tickets.map((item) => item.assignedTo))];
  };

  const assignedTo = assignedToDropDownList();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div className="row my-5">
              <div className="col">
                <h4 className="border-bottom">Filters</h4>
              </div>
              <div className="col-sm-12 my-2">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  //   value={""}
                  onChange={""}
                />
              </div>

              <div className="col-sm-12 my-2">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={""}
                />
              </div>

              <div className="col-sm-12 my-2">
                <label htmlFor="status">status</label>
                <select className="form-control" id="status" onChange={""}>
                  <option value="">Select</option>
                  {status.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-12 my-2">
                <label htmlFor="assignedTo">assignedTo</label>
                <select className="form-control" id="assignedTo" onChange={""}>
                  <option value="">Select</option>
                  {assignedTo.map((assignedTo) => (
                    <option value={assignedTo} key={assignedTo}>
                      {assignedTo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-sm-12 my-2">
                <label htmlFor="startDate">From</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  onChange={""}
                />
              </div>
              <div className="col-sm-12 my-2">
                <label htmlFor="endDate">To</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  onChange={""}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row mt-5">
              <div>
                <h2> there are {tickets.status = "Answered".length} post in the Database </h2>
                <Table striped bordered hover variant="">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>create date</th>
                      <th>update date</th>
                      <th>problem</th>
                      <th>assignedTo</th>
                      <th>status</th>
                      <th>customerPhone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((item) => {
                      return (
                        <tr>
                          <td>{item._id}</td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString(
                              "he-IL"
                            )}
                          </td>
                          <td>
                            {new Date(item.updatedAt).toLocaleDateString(
                              "he-IL"
                            )}
                          </td>
                          <td>{item.problem}</td>
                          <td>{item.assignedTo}</td>
                          <td>{item.status}</td>
                          <td>{item.customerPhone}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDate;