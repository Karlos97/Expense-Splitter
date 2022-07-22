import React from 'react'
import Modal from '../../UI/Modal'
import findUserName from '../FindUserName'
import { useCardContext } from '../../../context/CardContext'
const CreateUserSummary = (props) => {
  const { expenses, usersList } = useCardContext()

  const userPaidFor = expenses.filter(
    (exp) => exp.paidBy === props.userSummaryId
  )
  const userAsParticipant = expenses.filter((exp) => exp.participants.some(id => props.userSummaryId === id))

  const userPaidForSummaryLayout = userPaidFor?.map((el, i) => {
    return (
      <p key={el.id}>
        {el.description}: {el.cost}[$]
      </p>
    )
  })
  const userSummaryName = findUserName(usersList, props.userSummaryId)
  const userAsParticipantSummaryLayout = userAsParticipant?.map((el, i) => {
    const name = findUserName(usersList, el.paidBy)
    return (
      <div key={el.id}>
        <p>{el.description}:{el.cost}[$]</p>
        <p> Paid by : {name}</p>
      </div>
    )
  })
  const valOfTransactions = userAsParticipantSummaryLayout.length
  return (
    <Modal onClose={props.onHideUserSummary}>
      <h2> {userSummaryName} paid for:</h2>
      <div>{userPaidForSummaryLayout}</div>
      <h2> {userSummaryName} took a part in {valOfTransactions} transactions:</h2>
      <div>{userAsParticipantSummaryLayout}</div>
    </Modal>
  )
}
export default CreateUserSummary
