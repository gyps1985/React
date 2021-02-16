import './search.css'

import { Button, Container, Form } from "react-bootstrap";

import SearchDetails from "./SearchDetails";
import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [id, setId] = useState("");
  const [searchAll, setSearchAll] = useState(false);
  const [searchResult, setSearchResult] = useState([
    { firstname: "", middlename: "", lastname: "", id: "" },
  ]);

  const getData = async (id)=> {
    var url = "http://localhost:5000/person";
    var result = [];
    if (id) url = `${url}/${id}`;
    await axios.get(url).then((response) => {
      console.log(response.data);
      
      result = Array.isArray(response.data) ? response.data : [response.data];
    }).catch((ex)=> {console.log(ex);result = [];});
    return result;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    var filteredResult = [];
    console.log(`searchAll   :::  ${searchAll}`);
    if(searchAll)
    {
    filteredResult = await getData();
    }
    else if (id && id.trim().length > 0 && !searchAll ) {
      filteredResult = await getData(id);

    } else {
      alert("Please Enter First Name to Search");
    }
    console.log('result is ');
    console.log([filteredResult]);
    setSearchResult(...[filteredResult]);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setId("");
    setSearchResult([]);
    setSearchAll(false);
  };
  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstname",
    },
    {
      Header: "Middle Name",
      accessor: "middlename",
    },
    {
      Header: "Last Name",
      accessor: "lastname",
    },
  ];
  return (
    <Container className='block-border'>
      <Form.Group>
        <Form.Control
          placeholder="Enter Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="text"
        />
        <Form.Check 
    type="switch"
    id="searchAllSwitch"
    checked = {searchAll}
    onChange={(e) => setSearchAll(e.currentTarget.checked)}
    label="Search All"
  />
        <div>
          <Button variant="primary" onClick={handleSubmit} className="btn">
            Search
          </Button>
          <Button variant="primary" onClick={handleReset} className="btn">
            Reset
          </Button>
        </div>
      </Form.Group>
      <SearchDetails columns={columns} data={searchResult} />
    </Container>
  );
};

export default Search;
