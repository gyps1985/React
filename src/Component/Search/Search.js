import "./search.css";

import { Button, Container, Form } from "react-bootstrap";
import { columns, emptySearchObject, noneDropDownObject } from './searchDefaults';
import { useEffect, useState } from "react";

import DropDown from "../../Controls/DropDown";
import SearchDetails from "./SearchDetails";
import axios from "axios";

const Search = () => {
  const [id, setId] = useState("");
  const [searchAll, setSearchAll] = useState(false);
  const [selectedIdentification, setSelectedIdentification] = useState({id:"", description:""});
  const [searchResult, setSearchResult] = useState([
    emptySearchObject
  ]);
  const [identifications, setIdentification] = useState([]);
  useEffect(() => {
    axios.get("/identification").then((response) => {
      if (response) {
        console.log(response.data);
        console.log(noneDropDownObject);
        console.log([...noneDropDownObject,...response.data]);
        setIdentification([...noneDropDownObject, ...response.data]);

      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (id, identificationType) => {
    var url = "http://localhost:5000/person";
    var result = [];
    if (id) url = `${url}/${id}`;
    if((!id || id.trim().length <= 0) && identificationType) url = `${url}/?identificationType=${identificationType}`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);

        result = Array.isArray(response.data) ? response.data : [response.data];
      })
      .catch((ex) => {
        console.log(ex);
        result = [];
      });
    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var filteredResult = [];
    console.log(`selectedIdentification   :::  ${selectedIdentification.description}`);
    console.log(selectedIdentification);
    if (searchAll) {
      filteredResult = await getData();
    } else if (id && id.trim().length > 0 && !searchAll && selectedIdentification.id <= 0) {
      filteredResult = await getData(id);
    } else if (!searchAll && selectedIdentification.id > 0) {
      filteredResult = await getData('',selectedIdentification.id); 
    } else {
      alert("Please Enter First Name or Identification to Search");
      return;
    }
    console.log("result is ");
    console.log(filteredResult);
    setSearchResult(...[filteredResult]);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setId("");
    setSearchResult([]);
    setSearchAll(false);
  };
  const handleDDChange = (e) => {
    const {options, value} = e.target;
    setSelectedIdentification({id:e.target.value,description:options[value].label});
  };
  
  return (
    <Container className="block-border">
      <Form.Group>
        <Form.Control
          placeholder="Enter Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="text"
        />
        <DropDown
          options={identifications}
          lblText="Identification Type"
          name="identificationType"
          onChange={handleDDChange}
        ></DropDown>
        <Form.Check
          type="switch"
          id="searchAllSwitch"
          checked={searchAll}
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
