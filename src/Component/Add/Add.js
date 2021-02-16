import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import TextControl from "../../Controls/TextControl";
import TextControlRequired from "../../Controls/TextControlRequired";
import axios from "axios";
import DropDown from "../../Controls/DropDown";

const Add = (props) => {
  const [isValid, checkValid] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    identificationId: 1
  });
  const [identifications,setIdentification] = useState([]);

  useEffect(()=>{
    axios.get('/identification').then(response=>{
      if(response)
      {
        setIdentification(response.data);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = (event) => {
    alert('Handle Submit');
    const form = event.currentTarget;
    event.preventDefault();
    console.log(identifications);
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    else{
      axios.post('/person', data).then(response=>console.log(response));
    }
    checkValid(true);
  };

  const handleChange = (e) => {
    alert(e.target.value);
    setData({...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Form noValidate validated={isValid} onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs="auto">
            <TextControlRequired
              controlId="fNameCtrl"
              lblText="First Name"
              placeholder="Enter First Name"
              inValidMessage="First Name is required"
              OnChange={handleChange}
              name="firstname"
            ></TextControlRequired>
          </Col>
          <Col xs="auto">
            <TextControl
              controlId="midNameCtrl"
              lblText="Middle Name"
              placeholder="Enter Middle Name"
              OnChange={handleChange}
              name="middlename"
            ></TextControl>
          </Col>
          <Col xs="auto">
            <TextControlRequired
              controlId="lNameCtrl"
              lblText="Last Name"
              placeholder="Enter Last Name"
              inValidMessage="Last Name is required"
              OnChange={handleChange}
              name="lastname"
            ></TextControlRequired>
          </Col>
          <Col xs="auto">
            <DropDown options={identifications} lblText='Identification Id' name='identificationId' onChange={handleChange}></DropDown>
          </Col>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
