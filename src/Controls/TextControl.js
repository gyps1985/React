import { Form } from "react-bootstrap";
import React from "react";

const TextControl = (props) => {
  return (
    <Form.Group controlId={props.ctrlNamr}>
      <Form.Label>{props.lblText}</Form.Label>
      <Form.Control type="text" placeholder={props.placeholder} onChange={props.OnChange} value={props.value} name={props.name}></Form.Control>
    </Form.Group>
  );
};

export default TextControl;
