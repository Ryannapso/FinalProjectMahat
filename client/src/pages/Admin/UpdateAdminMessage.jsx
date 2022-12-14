import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAdminMessage = ({ match }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [ticket, setTicket] = useState({
    title: "",
    msg: "",
    type: "",
    id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/AdminMessage/" + id)
      .then((response) => setTicket(response.data));
  }, []);

  const ticketUpdate = () => {
    axios
      .put("http://localhost:3001/api/AdminMessage/" + id, ticket)
      .then((res) => toast.success(res.data))
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
    navigate("/dashboard");
  };

  const ticketDelete = () => {
    axios
      .delete("http://localhost:3001/api/AdminMessage/" + id)
      .then((res) => toast.success(res.data))
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((oldticket) => {
      return {
        ...oldticket,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="display-6 text-center mb-4">
                <b>Update Ticket </b>
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
                    id
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={ticket._id}
                    // onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    title
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={ticket.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    msg
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="msg"
                    placeholder="John Smith"
                    name="msg"
                    value={ticket.msg}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    type
                  </label>
                  <select
                    required
                    type="text"
                    className="form-control"
                    id="type"
                    placeholder="John Smith"
                    name="type"
                    value={ticket.type}
                    onChange={handleChange}
                  >
                    <option value="success">success-green</option>
                    <option value="danger">danger-red</option>
                    <option value="warning">warning-yellow</option>
                  </select>
                </div>
                <div className="buttons d-flex justify-content-center p-1">
                  <button
                    type="submit"
                    className="btn btn-outline-primary rounded-pill px-4"
                    onClick={ticketUpdate}
                  >
                    Update Message{" "}
                    <i className="fa fa-pencil-square-o ms-6"></i>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-danger rounded-pill px-5 ms-5"
                    onClick={ticketDelete}
                  >
                    Delete Message
                    <i className="fa fa-trash  aria-hidden=true" ms-4></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateAdminMessage;
