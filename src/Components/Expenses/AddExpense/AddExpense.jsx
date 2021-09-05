import React, { Fragment, useEffect, useState, useRef } from "react";
import Button from "../../UI/Button";

import Modal from "../../UI/Modal";
import classes from "./AddExpense.module.scss";
import buttonClasses from "../../UI/Button.module.scss";
import Checkbox from "../../UI/Checkbox";
import SelectInput from "../../UI/SelectInput";
import { useCardContext } from "../../../context/CardContext";
import { uuid } from "uuidv4";

// const usersList = ["Maciek", "Tomek", "Ania","Maciek", "Tomek", "Ania","Maciek", "Tomek", "Ania"];
{
  /* <SelectInput usersList={usersList}/> */
}

const AddExpense = (props) => {
  //   const btnClassName = `${buttonClasses.button} ${buttonClasses["button-small"]}`

  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [participants, setParticipants] = useState("");
  const [isPaidFor, setIsPaidFor] = useState("");
  const [isPaidOf, setIsPaidOf] = useState("");
  const { usersList, addExpense, addUser, removeExpense } = useCardContext();
  const [paidBy, setPaidBy] = useState(usersList[0].id);
// potzeba mi ustawic wartosc startowa z checkboxa
// potrzeba ustawic usera ktory w poprzednim kroku byl paidby
// najlepiej ustawic funkcje, ktora automatycznie zaznacza checkbox jak wybierze sie opcje paidby
//ale to funkcjonalnosc dodatkowa
  const id = uuid();
  const handleAddExpense = (e) => {
    addExpense({
      description,
      cost,
      participants,
      paidBy,
      id,
    });
  };

  const onHandleSetParticipants = (id, checked) => {
    if (checked) {
      setParticipants([...participants, id]);
    } else {
      if (participants.includes(id)) {
        setParticipants(
          participants.filter((participantId) => participantId !== id)
        );
      }
    }
  };

  // const exampleInput = useRef();
  // const inputTest = () =>  setPaidBy(exampleInput.current.value)

  // const inputTest = (e) => {

  //  return e.current.value;

  // }
  // const handleSeclectInputValue = (e) => {
  //   setPaidBy(e.currentTarget.value);
  //   console.log(`event: ${e.currentTarget}`);
  // };
  const checkBoxes = usersList.map((el) => {
    return (
      <Checkbox
        name={el.name}
        id={el.id}
        participants={participants}
        onChange={onHandleSetParticipants}
      />
    );
  });

  return (
    <Modal onClose={props.onClose}>
      <h2>Add expense to expenses list</h2>
      <div className={classes["expense-input"]}>
        <input
          type="input"
          className={classes.form__field}
          placeholder="expense"
          name="expense"
          id="expense"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
        />
        <label for="expense" className={classes.form__label}>
          Expense
        </label>
      </div>
      <div className={classes["cost-input"]}>
        <input
          type="input"
          className={classes.form__field}
          placeholder="cost"
          name="cost"
          id="cost"
          value={cost}
          onChange={(e) => setCost(e.currentTarget.value)}
          required
        />
        <label for="cost" className={classes.form__label}>
          Cost
        </label>
      </div>

      <div className={classes.checkboxes}>
        <p className={classes.addExpenseParagraph}>
          Choose expense participants:
        </p>
        {checkBoxes}
      </div>
      <p className={classes.addExpenseParagraph}>
        Choose who paid for this expense:
      </p>

      <SelectInput
        usersList={usersList}
        onChange={(e) => {
          setPaidBy(e.currentTarget.value);
          let addAlsoAsParticipant = 1;
          participants.forEach((el) => {
            console.log(`el: ${el} targetValue ${e.currentTarget.value}`)
            // if (el === e.currentTarget.value && !addAlsoAsParticipant) {
            if (el === e.currentTarget.value) {
              addAlsoAsParticipant += 1;
              console.log("zmieniam na true")
            }
          });
          if (addAlsoAsParticipant < 2) {
            setParticipants([...participants, e.currentTarget.value]);
          }
        }}
      />

      <Button
        type="button"
        class={`${classes.button} ${buttonClasses.button} ${buttonClasses["button-small"]}`}
        onClick={handleAddExpense}
      >
        Add Expense
      </Button>
    </Modal>
  );
};

export default AddExpense;
