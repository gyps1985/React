export const emptySearchObject = {
    firstname: "",
    middlename: "",
    lastname: "",
    id: "",
    identificationType: "",
    identificationId: "",
  };
  export const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "firstname",
    },
    {
      Header: "Middle Name",
      accessor: "middlename",
    },
    {
      Header: "Last Name",
      accessor: "lastname",
    },
    {
      Header:"Identification Id",
      accessor: "identificationId",
    }
  ];
  export const noneDropDownObject = [{id:0,description:'None'}];