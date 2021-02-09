import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import TextControl from "../../Controls/TextControl";
import TextControlRequired from "../../Controls/TextControlRequired";

const Add = (props) => {
  const [isValid,checkValid] = useState(false);

  const handleSubmit=(event)=>{
    const form = event.currentTarget;

    if(!form.checkValidity()){
      event.preventDefault();
      event.stopPropagation();
    }
    checkValid(true);
  }

  const OnChange=(e)=>{
    alert(e.target.value);
  }

  return (
    <Container>
      <Form noValidate validated={isValid} onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs="auto">
            <TextControlRequired
              controlId="fNameCtrl"
              lblText="First Name"
              placeholder="Enter First Name"
              inValidMessage="First Name is required" OnChange={OnChange}
            ></TextControlRequired>
          </Col>
          <Col xs="auto">
            <TextControl
              controlId="midNameCtrl"
              lblText="Middle Name"
              placeholder="Enter Middle Name" OnChange={OnChange}
            ></TextControl>
          </Col>
          <Col xs="auto">
            <TextControlRequired
              controlId="lNameCtrl"
              lblText="Last Name"
              placeholder="Enter Last Name"
              inValidMessage="Last Name is required" OnChange={OnChange}
            ></TextControlRequired>
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
