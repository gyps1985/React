import React from "react";
import { Form } from "react-bootstrap";

const TextControl = (props) => {
  return (
    <Form.Group controlId={props.ctrlNamr}>
      <Form.Label>{props.lblText}</Form.Label>
      <Form.Control type="text" placeholder={props.placeholder} onChange={props.OnChange} name={props.name}></Form.Control>
    </Form.Group>
  );
};

export default TextControl;
