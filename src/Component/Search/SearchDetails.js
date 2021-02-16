import React, {useMemo}  from "react";

import { useTable } from "react-table";

const SearchDetails = ({columns, data}) => {
  
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
  return (
    <React.Fragment>
    {!data || data.length > 0 ? <table {...getTableProps()} className='table'>
        <thead style={{backgroundColor:"darkGrey"}}>
        {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
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
              </tr>
            );
          })}
        </tbody>
      </table> : 'No item found for the given serach criterion'}
    </React.Fragment>
  );
};

export default SearchDetails;
