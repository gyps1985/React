import React, { useMemo } from "react";

import {useHistory} from 'react-router-dom';
import { useTable } from "react-table";

// import { Link } from "react-router-dom"


// import Add from '../Add/Add.js';



// import HeaderNav from '../Header'
const SearchDetails = (props) => {
  //{ columns, data, onDelete }
  const columns = props.columns;
  const data = props.data;
  const onDelete = props.onDelete;
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
      "border-bottom": "1px solid lightgray",
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
  });
  const history = useHistory();
  const onEditClick = (id) =>{
    history.push('/add', { userId: id });
  };
  return (
    <React.Fragment>
      {!data || data.length > 0 ? (
        <table {...getTableProps()} className="table">
          <thead style={{ backgroundColor: "darkGrey" }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
                <th>Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    borderBottom: "1.5px solid lightgray",
                    height: "24px",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  {row.cells[0].value > 0 && (
                    <td role="cell">
                      <div>
                        <button className="editBtn" onClick={()=>onEditClick(row.cells[0].value)}>Edit</button>
                        <button className="deleteBtn" onClick={() => onDelete(row.cells[0].value)}>Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No item found for the given serach criterion"
      )}
    </React.Fragment>
  );
};

export default SearchDetails;
