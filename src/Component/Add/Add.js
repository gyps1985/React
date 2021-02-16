import { useEffect, useState, useReducer } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import TextControl from "../../Controls/TextControl";
import TextControlRequired from "../../Controls/TextControlRequired";
import axios from "axios";
import DropDown from "../../Controls/DropDown";
import Toastr from "../../Controls/Toastr";
import addReducer from "../Add/Reducer/addReducer";

const Add = () => {
  const initialState = {
    data:{
      firstname: "",
      middlename: "",
      lastname: "",
      identificationType: 1,
      identificationId:''
    },
    isNotification : false,
    notifiedMessage: {type:'', message:''}
  }

  const [isValid, checkValid] = useState(false);
  const [identifications,setIdentification] = useState([]);
  const [state, dispatch] = useReducer(addReducer, initialState);

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
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    else{
      axios.post('/person', state.data).then(response=>{
        if(response.data){
          dispatch({type:'Message', payload:{...state, isNotification: true, notifiedMessage:{
            type:'Success',
            message: 'Successfully added'
          }}})
        }
      });
    }
    checkValid(true);
  };

  const handleChange = (e) => {
    dispatch({
      type:'Add',
      payload:{...state.data, [e.target.name]: e.target.value }
    })
  };

  const handleClose = () =>{
    console.log('Close');
    dispatch({type:'Message', payload:{...state, isNotification: false, notifiedMessage: initialState.notifiedMessage}});
  }

  return (
    <Container>
      {state.isNotification && <Toastr errorInfo = {state.notifiedMessage} onClose={handleClose}></Toastr>}
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
          </Form.Row>
          <Form.Row>
          <Col xs="auto">
            <DropDown options={identifications} lblText='Identification Type' name='identificationType' onChange={handleChange}></DropDown>
          </Col>
          <Col xs="auto">
            <TextControlRequired
              controlId="identificationIdCtrl"
              lblText="Identification Id"
              placeholder="Enter Identification Id"
              inValidMessage="Identification Id is required"
              OnChange={handleChange}
              name="identificationId"
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
