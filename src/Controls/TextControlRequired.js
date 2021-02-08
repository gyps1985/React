import { Form } from "react-bootstrap";

const TextControlRequired = (props) => {
  return (
    <Form.Group controlId={props.ctrlNamr}>
      <Form.Label>{props.lblText}</Form.Label>
      <Form.Control
        type="text"
        placeholder={props.placeholder}
        required
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {props.inValidMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextControlRequired;
