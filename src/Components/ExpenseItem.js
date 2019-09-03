import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ExpenseItem = ({item, handleEdit, handleDelete}) => {
  const {id, charge, amount} = item;
  return (
    <li className="item" data-id={id}>
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">{amount}</span>
      </div>
      <div>
        <button 
          className="edit-btn" 
          aria-label="edit button"
          onClick={()=>handleEdit(id)}
          ><MdEdit /></button>
        <button 
          className="delete-btn clear-btn"
          aria-label="delete button"
          onClick={()=>handleDelete(id)}
          ><MdDelete /></button>
      </div>
    </li>
  );
};

export default ExpenseItem;