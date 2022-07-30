import React, { useState } from "react";
import Axios from "axios";

const NewCustomer = () => {
  //post
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, setAddress] = useState("");
  //const [UserDate, setUserDate] = useState("");
  const [problem, setProblem] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");

  const addToList = () => {
    Axios.post("http://localhost:3001/api/customers", {
      name: name,
      email: email,
      address: address,
      //UserDate: UserDate,
      phone: phone,
      problem: problem,
      assignedTo: assignedTo,
      status: status,
    });
  };
  //end of post

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Service call</h3>
              <h1 className="display-6 text-center mb-4">
                new <b>Ticket</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="/assets/contact.jpg" alt="Contact" className="w-75" />
            </div>
            <div className="col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    phone
                  </label>
                  <input
                    required
                    type="phone"
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={(event) => {
                      SetPhone(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    address
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="address"
                    name="address"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    problem
                  </label>
                  <textarea
                    required
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    name="message"
                    onChange={(event) => {
                      setProblem(event.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    assignedTo
                  </label>
                  <select
                    required
                    type="text"
                    className="form-control"
                    id="assignedTo"
                    placeholder="assignedTo"
                    name="name"
                    onChange={(event) => {
                      setAssignedTo(event.target.value);
                    }}
                  >
                    <option value="cr">cr</option>
                    <option value="Phone">Phone</option>
                    <option value="PC">PC</option>
                    <option value="BuildPc">BuildPc</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    status
                  </label>
                  <select
                    required
                    type="text"
                    className="form-control"
                    id="status"
                    // placeholder="status"
                    name="status"
                    onChange={(event) => {
                      setStatus(event.target.value);
                    }}
                  >
                    <option value="open">open</option>
                    <option value="Updated">Updated</option>
                    <option value="Answered">Answered</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={addToList}
                >
                  Send Message <i className="fa fa-paper-plane ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCustomer;