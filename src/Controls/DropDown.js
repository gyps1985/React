import { Form } from "react-bootstrap";

const DropDown = (props) => {
  return (
    <Form.Group>
      <Form.Label>{props.name}</Form.Label>
      <Form.Control as="select">
        {props.options.map((option) => {
          return <option key={option.id} value={option.id}>{option.description}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default DropDown;
