import { Button, Col, Container, Form } from "react-bootstrap";

import SearchDetails from "./SearchDetails";
import TextControlRequired from "../../Controls/TextControlRequired";
import { useState } from "react";

const Search = () => {
  const details = [
    {
      id: 1,
      firstName: "testFirst1",
      middleName: "testMiddle1",
      lastName: "testLast1",
    },
    {
      id: 2,
      firstName: "testFirst2",
      middleName: "testMiddle2",
      lastName: "testLast2",
    },
    {
      id: 3,
      firstName: "testFirst3",
      middleName: "testMiddle3",
      lastName: "testLast3",
    },
  ];
  const [searchResult, setSearchResult] = useState([...details]);
  const [firstName, setFirstName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName && firstName.trim().length > 0) {
      const filteredResult = details.filter(
        (detail) =>
          detail.firstName.trim().toLowerCase() ===
          firstName.trim().toLocaleLowerCase()
      );
      setSearchResult([...filteredResult]);
    }
    else{
        alert('Please Enter First Name to Search')
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
    setFirstName('');
    setSearchResult([...details]);
  }
  const columns = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Middle Name",
      accessor: "middleName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
  ];
  return (
    <Container>
      <Form.Group>
        <Form.Control
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
        />
        <div>
        <Button variant="primary" onClick={handleSubmit}>
          Search
        </Button>
        <Button variant="primary" onClick={handleReset}>
          Reset
        </Button>
        </div> 
      </Form.Group>
      <SearchDetails columns={columns} data={searchResult} />
    </Container>
  );
};

export default Search;
