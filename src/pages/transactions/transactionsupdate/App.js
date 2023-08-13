import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import {
  getAllDocumentsFromCollection,
  updateSpecificDocumentInCollection,
} from "../../../firebaseQueries";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const App = ({ transaction }) => {
  const [transactions, setTransactions] = useState([]);

  const [service, setService] = useState([]);

  const [serviceFlag, setServiceFlag] = useState("service");
  const [amount, setAmount] = useState("0.00");
  const [totalamount, setTotalAmount] = useState("0.00");

  const [quantity, setQuantity] = useState("0");
  const [price, setPrice] = useState("0");
  const navigate = useNavigate();

  useEffect(() => {
    const getService = async () => {
      const serviceData = await getAllDocumentsFromCollection("services");
      console.log("Service Data", serviceData);
      setService(serviceData);
    };
    getService();
  }, []);

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const productData = await getAllDocumentsFromCollection("products");
      console.log("Product Data", productData);
      setProduct(productData);
    };
    getProduct();
  }, []);

  const [addFormData, setAddFormData] = useState({
    type: "",
    item: "",
    quantity: "1",
    amount: "0.00",
  });

  const [editFormData, setEditFormData] = useState({
    type: "",
    item: "",
    quantity: "1",
    amount: "0.00",
  });

  const [editTransactionId, setEditTransactionId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleCompleteTransaction = async (event) => {
    event.preventDefault();

    console.log("Complete Transaction", transactions);
    console.log("Appointment", transaction);
    transactions.forEach((transact) => {
      const transactId = uuidv4();
      console.log(transact.item);
      setDoc(doc(db, "transactions", transactId), {
        id: transactId,
        type: transact.type,
        item: transact.item,
        quantity: transact.quantity,
        amount: transact.amount,
        timeStamp: serverTimestamp(),
        doctorid: transaction.doctor,
        petid: transaction.pet,
        userid: transaction.userid,
        appointmentid: transaction.id,
        doctorname: transaction.doctorname,
        petname: transaction.petname,
      });
    });

    updatePaymentStatus();
  };

  const updatePaymentStatus = async () => {
    try {
      await updateSpecificDocumentInCollection("appointments", transaction.id, {
        paymentstatus: "Pending",
        status: "Served",
        totalAmount: totalamount,
      });

      navigate(-1);
    } catch (error) {}
  };

  const handleQuantityFormChange = (event) => {
    event.preventDefault();

    const fieldValueQuantity = event.target.value;

    setAmount(Number(fieldValueQuantity) * Number(price));
    setQuantity(fieldValueQuantity);
    console.log("Quantity Change", quantity);

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    console.log("Quantity and Amount", fieldValue, amount, fieldName);
    // setQuantity(fieldValue);

    console.log("Quantity", fieldValueQuantity);

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    console.log("Quantity", newFormData);

    setAddFormData(newFormData);
  };

  const handleServiceFormChange = (event) => {
    event.preventDefault();

    const fieldValueAmount = event.target.value;

    console.log(
      "Service Amount",
      fieldValueAmount.split("-")[2],
      fieldValueAmount,
      quantity
    );
    setAmount(Number(fieldValueAmount.split("-")[2]) * quantity);
    setPrice(fieldValueAmount.split("-")[2]);
    // setQuantity("1");

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    const fieldNameQuantity = "quantity";
    newFormData[fieldNameQuantity] = quantity;
    const fieldNameAmount = "amount";
    newFormData[fieldNameAmount] = "amount";

    setAddFormData(newFormData);
  };
  const handleProductFormChange = (event) => {
    event.preventDefault();

    const fieldValueAmount = event.target.value;

    console.log("Product Amount", fieldValueAmount.split("-")[2]);
    setAmount(Number(fieldValueAmount.split("-")[2]) * quantity);
    setPrice(fieldValueAmount.split("-")[2]);
    // setQuantity("1");

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    const fieldNameQuantity = "quantity";
    newFormData[fieldNameQuantity] = quantity;
    const fieldNameAmount = "amount";
    newFormData[fieldNameAmount] = amount;

    setAddFormData(newFormData);
  };

  const handleTypeFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    if (fieldName === "type" && fieldValue === "service") {
      setServiceFlag("service");
    }
    if (fieldName === "type" && fieldValue === "product") {
      setServiceFlag("product");
    }

    console.log(serviceFlag);

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {
      id: nanoid(),
      type: addFormData.type,
      item: addFormData.item,
      quantity: addFormData.quantity,
      amount: amount,
    };

    setTotalAmount(Number(totalamount) + Number(amount));

    console.log("TotalAmount Amount", totalamount, amount);

    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    console.log("All Transactions", transactions);
    // setAddFormData({
    //   type: "",
    //   item: "",
    //   quantity: "1",
    //   amount: "0.00",
    // });
    // console.log("Query", document.getElementsByName("type"));
    // document.getElementsByName("type").selectedIndex = 0;
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedTransaction = {
      id: editTransactionId,
      type: editFormData.type,
      item: editFormData.item,
      quantity: editFormData.quantity,
      amount: editFormData.amount,
    };

    const newTransactions = [...transactions];

    const index = transactions.findIndex(
      (transaction) => transaction.id === editTransactionId
    );

    newTransactions[index] = editedTransaction;

    setTransactions(newTransactions);
    setEditTransactionId(null);
  };

  const handleEditClick = (event, tranaction) => {
    event.preventDefault();
    setEditTransactionId(tranaction.id);

    const formValues = {
      type: tranaction.type,
      item: tranaction.item,
      quantity: tranaction.quantity,
      amount: tranaction.amount,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditTransactionId(null);
  };

  const handleDeleteClick = (transactionId) => {
    const newTransactions = [...transactions];

    const index = transactions.findIndex(
      (transaction) => transaction.id === transactionId
    );
    console.log("Deduct Amount", newTransactions[0].amount);

    setTotalAmount(Number(totalamount) - Number(newTransactions[0].amount));

    newTransactions.splice(index, 1);

    setTransactions(newTransactions);
    console.log("Delete Transactions", transactions);
  };

  return (
    <div className="app-container">
      <h2>Service and Item Transactions [Total Amount: P {totalamount}]</h2>
      <form onSubmit={handleAddFormSubmit}>
        <select
          type="text"
          name="type"
          onChange={handleTypeFormChange}
          required="required"
        >
          <option value="">Type</option>
          <option value="service">Service</option>
          <option value="product">Product</option>
        </select>
        {serviceFlag === "service" ? (
          <select
            type="text"
            name="item"
            onChange={handleServiceFormChange}
            required="required"
          >
            <option value="">Item</option>
            {service.map((serv) => (
              <option
                key={`${serv.servicecode}`}
                value={`${serv.servicecode}-${serv.servicename}-${serv.price}`}
              >
                {serv.servicecode} - {serv.servicename}
              </option>
            ))}
          </select>
        ) : (
          <select
            type="text"
            name="item"
            onChange={handleProductFormChange}
            required="required"
          >
            <option value="">Item</option>
            {product.map((prod) => (
              <option
                key={`${prod.productcode}`}
                value={`${prod.productcode}-${prod.productname}-${prod.price}`}
              >
                {prod.productcode}-{prod.productcode}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          name="quantity"
          defaultValue={quantity}
          required="required"
          onChange={handleQuantityFormChange}
        />
        {serviceFlag === "service" ? (
          <input
            type="number"
            name="amount"
            readOnly
            required="required"
            value={amount}
          />
        ) : (
          <input
            type="number"
            name="amount"
            required="required"
            value={amount}
          />
        )}
        <button type="submit">Add</button>
        <button type="button" onClick={handleCompleteTransaction}>
          Complete Transaction
        </button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Quanity</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <Fragment>
                {editTransactionId === transaction.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    transaction={transaction}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
