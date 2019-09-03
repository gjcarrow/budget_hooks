import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './Components/ExpenseList';
import ExpenseForm from './Components/ExpenseForm';
import Alert from './Components/Alert';
import uuid from 'uuid/v4';


const initialExpenses = localStorage.getItem('expenses')?JSON.parse(localStorage.getItem('expenses')):[]

// import useState() which is a method that
// returns an array with 2 elements. The first element of the array is
// the actual value of that particular state. The second element is a 
// function that is called for state updates/control/default values

function App() {
  // ****************** State Values ******************
  // ****************** State Values ******************
  // ****************** State Values ******************
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);


  // useEffect : allows you to perform side effects
  // Runs after every render
  //  first parameter - callback function (runs after render)
  //  second parameter - array for letting react know when to run useEffect
  //  react re-renders when state has changed or props 

  useEffect(()=>{
    console.log('we called useEffect');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses])
  
  
  
  // class based components would use
  // state = {} to set the value of state
  // and state would be updated with this.setState({})
  // the setState function is like the second value in the array described above for useState  

  // ****************** Functionality ******************
  // ****************** Functionality ******************
  // ****************** Functionality ******************
  const handleCharge = (e)=>{
    setCharge(e.target.value);
  }
  const handleAmount = (e)=>{
    setAmount(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(charge.trim()!=='' && amount) {
      if(edit) {
        let tempExpense = expenses.map(item=>{
         return item.id===id?{...item, charge, amount}:item
        })
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({type: 'success', text: 'successfull edit of item'})
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        }
        setExpenses([...expenses, singleExpense])
        handleAlert({type: 'success', text: 'Item has been successfully added'})
      }
      setCharge('')
      setAmount('')
    } else {
      const errorPlace = charge===''?'Charge':!amount?'Amount':'Values'
      handleAlert({
        type: 'danger',
        text: `${errorPlace} must not be empty.`
      })
    }
    fixFocus();
  }
  const handleAlert = ({type, text})=>{
   setAlert({show: true, type, text});
   setTimeout(()=>{
     setAlert({
       show: false
     })
   }, 5000)
  }

  const clearItems = ()=>{
    setExpenses([]); 
    fixFocus();
  }
  const fixFocus = _ => document.querySelector('#charge').focus()
  const handleDelete = (id)=>{
    let confirmDelete = window.confirm(`Are you sure you want to delete the ${charge} charge?`);
    if(!confirmDelete) {
      return;
    }
    let tempExpenses = expenses.filter(el => el.id !== id)
    setExpenses(tempExpenses);
    handleAlert({
      type: 'success',
      text: 'Item has been successfully deleted'
    })
    fixFocus() 
  }
  const handleEdit = (id)=>{
    const objectInQuestion = expenses.find(el=>el.id===id);
    const {charge, amount} = objectInQuestion;
    setEdit(true);
    setCharge(charge);
    setAmount(amount);
    setId(id)
    fixFocus();
  }
  
  

  // *********************************** Return Function
  // *********************************** Return Function
  // *********************************** Return Function
  // *********************************** Return Function
  
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/* <Alert /> */}
      <h1>
        budget calculator
      </h1>
      <main className="App">
        <ExpenseForm
          handleSubmit={handleSubmit}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          charge={charge}
          amount={amount}
          edit={edit}
         />
        <ExpenseList 
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
           />
      </main>
      <h1>
        total spending: {' '}
      <span className="total">${expenses.reduce((acc, curr )=>{
        return acc += Number(curr.amount)
      }, 0)}</span>
      </h1>
    </>
  );
}

export default App;
