import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import CustomerDetails from "../../../components/CustomerDetails";

const TicketList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tickets")
      .then((res) => setData(res.data));
  });
  const idFormatter = (data, row) => {
    return (
      <Link to={`/serviceCall/updateTicket/${data}`}>
        <Button variant="primary">Edit Ticket</Button>
      </Link>
    );
  };
  const rowStyle = (row, rowIndex) => {
    if (row === "Updated") {
      return { backgroundColor: "red", text: "bold" };
    }
  };

  const dateFormatter = (data, row) => {
    return new Date(data).toLocaleDateString("he-IL");
  };

  const customerFormatter = (data, row) => {
    return <CustomerDetails customer={data}></CustomerDetails>;
  };

  //make table using
  const columns = [
    {
      dataField: "_id",
      text: "Edit",
      formatter: idFormatter,
    },
    {
      dataField: "customer",
      text: "Customer",
      sort: true,
      filter: textFilter(),
      formatter: customerFormatter,
    },

    {
      dataField: "createdAt",
      text: "date",
      sort: true,
      filter: textFilter(),
      formatter: dateFormatter,
    },
    {
      dataField: "status",
      text: "status",
      sort: true,
      filter: textFilter(),
      style: rowStyle,
    },
    { dataField: "problem", text: "problem", sort: true, filter: textFilter() },
    {
      dataField: "assignedTo",
      text: "assignedTo",
      sort: true,
      filter: textFilter(),
    },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 20,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  return (
    <div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        columns={columns}
        data={data}
        pagination={pagination}
        filter={filterFactory()}
      />
    </div>
  );
};

export default TicketList;
