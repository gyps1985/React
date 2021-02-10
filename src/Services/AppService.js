import axios from "axios"

const savePerson = (data)=>{
    axios.post('/person', data).then(response=>console.log(response));
}

export default savePerson;