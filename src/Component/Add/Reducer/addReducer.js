const addReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return { ...state, data: action.payload };
      case "Edit":
        return { ...state, ...action.payload };
      case "Message":
        return {...state, isNotification:action.payload.isNotification, notifiedMessage: action.payload.notifiedMessage}

    default:
      return state;
  }
};

export default addReducer;
