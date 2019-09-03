import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleSubmit,
  handleAmount,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='expense'>charge</label>
          <input 
            type='text'
            className='form-control'
            name='charge'
            id='charge'
            placeholder='e.g. rent'
            value={charge}
            onChange={handleCharge}
             />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>amount</label>
          <input 
            type='number'
            className='form-control'
            name='amount'
            id='amount'
            placeholder='e.g. 100'
            value={amount}
            onChange={handleAmount}
             />
        </div>
      </div>
      <button type='submit' className='btn'>
        {edit?'edit':'submit'}
        <MdSend className='btn-icon' />
      </button>
    </form>
  );
};

export default ExpenseForm;