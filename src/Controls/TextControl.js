import { Form } from "react-bootstrap";
const TextControl = (props) => {
  return (
    <Form.Group controlId={props.ctrlNamr}>
      <Form.Label>{props.lblText}</Form.Label>
      <Form.Control type="text" placeholder={props.placeholder}></Form.Control>
    </Form.Group>
  );
};

export default TextControl;
