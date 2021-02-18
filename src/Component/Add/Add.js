import { Button, Col, Container, Form } from "react-bootstrap";
import { useEffect, useReducer, useState } from "react";

import DropDown from "../../Controls/DropDown";
import TextControl from "../../Controls/TextControl";
import TextControlRequired from "../../Controls/TextControlRequired";
import Toastr from "../../Controls/Toastr";
import addReducer from "../Add/Reducer/addReducer";
import axios from "axios";

const Add = (props) => {
  const initialState = {
    data: {
      firstname: "",
      middlename: "",
      lastname: "",
      identificationType: 1,
      identificationId: "",
    },
    isNotification: false,
    notifiedMessage: { type: "", message: "" },
  };

  const [isValid, checkValid] = useState(false);
  const [identifications, setIdentification] = useState([]);
  const [state, dispatch] = useReducer(addReducer, initialState);
  const [isupdate, setUpdate] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const getData = async (id) => {
    var url = "http://localhost:5000/person";
    var result = [];
    if (id) url = `${url}/${id}`;
    await axios
      .get(url)
      .then((response) => {
        result = Array.isArray(response.data) ? response.data : [response.data];
      })
      .catch((ex) => {
        console.log(ex);
        result = [];
      });
    return result;
  };
  useEffect(() => {
    axios.get("/identification").then((response) => {
      if (response) {
        setIdentification(response.data);
      }
    });
    // if( props && props.location && props.location.state && props.location.state.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.userId
    ) {
      console.log(`ID ===============> ${props.location.state.userId}`);
      getData(props.location.state.userId)
        .then((response) => {
          dispatch({
            type: "Edit",
            payload: { ...state.data, data: response[0] },
          });
        })
        .catch((e) => console.log(e));
      setUpdate(true);
      setButtonText('Update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.state && props.location.state.userId]);
  console.log(state.data);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      console.log(`isupdate ==> ${isupdate}`);
      if(!isupdate)
      {
      axios.post("/person", state.data).then((response) => {
        if (response.data) {
          dispatch({
            type: "Message",
            payload: {
              ...state,
              isNotification: true,
              notifiedMessage: {
                type: "Success",
                message: "Successfully added",
              },
            },
          });
        }
      });
    }
    else
    {
      axios.put(`/person/${state.data.id}`, state.data).then((response) => {
        if (response.data) {
          dispatch({
            type: "Message",
            payload: {
              ...state,
              isNotification: true,
              notifiedMessage: {
                type: "Success",
                message: "Successfully updated",
              },
            },
          });
        }
      });
    }
    }
    checkValid(true);
  };

  const handleChange = (e) => {
    dispatch({
      type: "Add",
      payload: { ...state.data, [e.target.name]: e.target.value },
    });
  };

  const handleClose = () => {
    console.log("Close");
    dispatch({
      type: "Message",
      payload: {
        ...state,
        isNotification: false,
        notifiedMessage: initialState.notifiedMessage,
      },
    });
  };

  return (
    <Container>
      {state.isNotification && (
        <Toastr
          errorInfo={state.notifiedMessage}
          onClose={handleClose}
        ></Toastr>
      )}
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
              value={state.data.firstname}
            ></TextControlRequired>
          </Col>
          <Col xs="auto">
            <TextControl
              controlId="midNameCtrl"
              lblText="Middle Name"
              placeholder="Enter Middle Name"
              OnChange={handleChange}
              name="middlename"
              value={state.data.middlename}
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
              value={state.data.lastname}
            ></TextControlRequired>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs="auto">
            <DropDown
              options={identifications}
              lblText="Identification Type"
              name="identificationType"
              onChange={handleChange}
              value={state.data.identificationType}
            ></DropDown>
          </Col>
          <Col xs="auto">
            <TextControlRequired
              controlId="identificationIdCtrl"
              lblText="Identification Id"
              placeholder="Enter Identification Id"
              inValidMessage="Identification Id is required"
              OnChange={handleChange}
              name="identificationId"
              value={state.data.identificationId}
            ></TextControlRequired>
          </Col>
        </Form.Row>
        <Button variant="primary" type="submit">
         { buttonText}
        </Button>
      </Form>
    </Container>
  );
};

export default Add;
