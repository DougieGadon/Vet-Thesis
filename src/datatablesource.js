export const userColumns = [
  {
    field: "role",
    headerName: "Role",
    width: 80,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.role}`}>
    //       {params.row.role}
    //     </div>
    //   );
    // },
  },
  { field: "id", headerName: "ID", width: 150 },
  // {
  //   field: "name",
  //   headerName: "Name",
  //   width: 200,
  //   renderCell: (params) => {
  //     return <div className="cellWithImg">{params.row.displayName}</div>;
  //   },
  // },
  {
    field: "displayName",
    headerName: "Name",
    width: 150,
  },
  {
    field: "username",
    headerName: "UserName",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },

  {
    field: "address",
    headerName: "Address",
    width: 300,
  },
];
