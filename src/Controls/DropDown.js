import { Form } from "react-bootstrap";

const DropDown = (props) => {
  return (
    <Form.Group>
      <Form.Label>{props.lblText}</Form.Label>
      <Form.Control as="select" name={props.name} onChange={props.onChange} value={props.value}>
        {props.options.map((option) => {
          return <option key={option.id} value={option.id}>{option.description}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default DropDown;
