import React, { Fragment } from "react";

import Modal from "../../UI/Modal";
import classes from "./CreateSummary.module.css";

import { useCardContext } from "../../../context/CardContext";
import findUserName from "../FindUserName";

const CreateSummary = (props) => {
  const { expenses, usersList } = useCardContext();

  const userAsParticipant = [];
  usersList.forEach((user, i) => {
    userAsParticipant[i] = expenses.filter((exp) => {
      return exp.participants.some((id) => {
        return user.id === id;
      });
    });
  });

  const overallSummary = {};
  userAsParticipant.forEach((usersExpenses, i) => {
    overallSummary[usersList[i].id] = {};
    usersExpenses.forEach((expense) => {
      expense.participants.forEach((participant) => {
        const howMuchParticipants = expense.participants.length;
        const splitCost = parseFloat(expense.cost) / howMuchParticipants;
        let actBalance = 0;

        if (overallSummary[usersList[i].id][participant]) {
          actBalance = overallSummary[usersList[i].id][participant].balance;
        }

        if (usersList[i].id !== participant) {
          if (usersList[i].id === expense.paidBy) {
            overallSummary[usersList[i].id][participant] = {
              balance: parseFloat(actBalance) + splitCost,
            };
          } else {
            if (participant === expense.paidBy) {
              overallSummary[usersList[i].id][participant] = {
                balance: parseFloat(actBalance) - splitCost,
              };
            }
          }
        }
      });
    });
  });

  console.log(overallSummary);

  /////// TABLICA PODSUMOWAWCZA DLA KADEGO USERA(TOTAL BALANCE)
  const balance = usersList.map((user, i) => {
    let summ = 0;
    userAsParticipant[i].forEach((el) => {
      if (user.id === el.paidBy) {
        summ +=
          el.cost * ((el.participants.length - 1) / el.participants.length);
      } else {
        summ -= el.cost / el.participants.length;
      }
    });
    return summ;
  });

  const userBalance = (value, type) => {
    if (value > 0) {
      return (
        <p className={classes.owes}>{type === "total"? " ":"Owes you "} ${Math.abs(value.toFixed(2))}</p>
      );
    } else {
      return (
        <p className={classes.owe}>{type === "total"? " " :"You owe "} ${Math.abs(value.toFixed(2))}</p>
      );
    }
  };
  const Summary = () =>
    Object.entries(overallSummary).map(([userId1, userSummary], i) => {
      const name = findUserName(usersList, userId1);
      const Header = () => (
        <>
          <h2>{name}</h2>
          <p>Total balance: </p>
          {userBalance(balance[i], "total")}
        </>
      );

      const bal = Object.entries(userSummary)?.map(([userId2, { balance }]) => {
        if (balance !== 0 && Object.keys(userSummary).length) {
          const name = findUserName(usersList, userId2);
          return (
            <>
              <p>{name} </p>
              {userBalance(balance)}
            </>
          );
        }
      });
      return (
        <div>
          <Header />
          {bal}
        </div>
      );
    });

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["summary-overview"]}>
        <h2>Expenses summary</h2>
        <Summary />
        {/* {summ} */}
      </div>
    </Modal>
  );
};

export default CreateSummary;
