import React from "react";

const ReadOnlyRow = ({ transaction, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{transaction.type}</td>
      <td>{transaction.item}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.amount}</td>
      <td>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, transaction)}
        >
          Edit
        </button> */}
        <button type="button" onClick={() => handleDeleteClick(transaction.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
