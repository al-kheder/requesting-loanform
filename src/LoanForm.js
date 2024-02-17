import React from "react";
import "./FormStyle.css";
import Modal from "./Modal";
import { useState } from "react";
import MyComponent from "./MyComponent";

export default function LoanForm({ title }) {
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
  function handlNameInputChange(value) {
    setLoanInputs({ ...loanInputs, name: value });
  }
  function handlPhoneNumberInputChange(value) {
    setLoanInputs({ ...loanInputs, phoneNumber: value });
  }
  function handlAgeInputChange(value) {
    setLoanInputs({ ...loanInputs, age: value });
  }

  return (
    <div onClick={handleDivClick} className="flex">
      <form action="" className="formstyling">
        <h1>Requesting a Loan</h1>
        <hr />

        {/* use a reusable  component  */}
        <MyComponent
          inputName="Name : "
          type="text"
          handlChange={handlNameInputChange}
          value={loanInputs.name}
        />
        <MyComponent
          inputName="Phone Number : "
          type="number"
          handlChange={handlPhoneNumberInputChange}
          value={loanInputs.phoneNumber}
        />
        <MyComponent
          inputName="Age : "
          type="number"
          handlChange={handlAgeInputChange}
          value={loanInputs.age}
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
