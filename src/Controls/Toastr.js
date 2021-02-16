import Toast from 'react-bootstrap/Toast'

const Toastr=({errorInfo, onClose})=>{
    return <Toast onClose={onClose}>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">{errorInfo.type}</strong>
    </Toast.Header>
    <Toast.Body>{errorInfo.message}</Toast.Body>
  </Toast>
}

export default Toastr;