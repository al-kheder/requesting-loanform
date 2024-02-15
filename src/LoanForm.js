import React from "react";
import "./FormStyle.css";
import Modal from "./Modal";
import { useState } from "react";

export default function LoanForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loanInputs, setLoanInputs] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    isEmployee: false,
    salaryRange: "",
  });
  const btnSubmitDisabled =
    loanInputs.name == "" ||
    loanInputs.age == "" ||
    loanInputs.phoneNumber == "";

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);
    const { age, phoneNumber } = loanInputs;
    if (age < 18 || age > 100) {
      setErrorMessage("The age is not allowed");
    } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      setErrorMessage("Phone Number Format is incorrect ");
    }
    setShowModal(true);
  }
  function handleDivClick() {
    if (showModal) {
      setShowModal(false);
    }
  }

  return (
    <div onClick={handleDivClick} className="flex">
      <form action="" className="formstyling">
        <h1>Requesting a Loan</h1>
        <hr />
        <label>Name:</label>
        <input
          type="text"
          value={loanInputs.name}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, name: event.target.value });
          }}
        />
        <label>Phone Number:</label>
        <input
          type="number"
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, phoneNumber: event.target.value });
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          value={loanInputs.age}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, age: event.target.value });
          }}
        />
        <label style={{ marginTop: "20px" }}>Are You an employee?</label>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={loanInputs.isEmployee}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, isEmployee: event.target.checked });
          }}
        />
        <label>Salary:</label>
        <select
          value={loanInputs.salaryRange}
          onChange={(event) => {
            setLoanInputs({ ...loanInputs, salaryRange: event.target.value });
          }}
        >
          <option>less than 500$</option>
          <option>between 500$ and 2000$</option>
          <option>above 2000$</option>
        </select>
        <button
          onClick={handleFormSubmit}
          disabled={btnSubmitDisabled}
          className={btnSubmitDisabled ? "disabled" : ""}
          id="submit-loan-button"
        >
          Submit
        </button>
      </form>
      {<Modal errorMessage={errorMessage} isVisible={showModal} />}
    </div>
  );
}
