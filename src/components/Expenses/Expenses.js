import React, { Component } from 'react'

import { getExpenses } from '../../api/auth.js'
import './Expenses.css'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import Table from 'react-bootstrap/Table'

class Expenses extends Component {
  constructor () {
    super()
    this.state = {
      expensedata: {},
      showyear: '',
      showmonth: ''
    }
  }

  componentDidMount () {
    // get expense data from API
    this.getExpenseFunc()

    const todayDate = new Date()
    const year = todayDate.getFullYear().toString()
    // getMonth starts with 0-11
    let month = todayDate.getMonth()
    if (month < 9) {
      month = '0' + (month + 1).toString()
    } else {
      month = (month + 1).toString()
    }
    this.setState({ showyear: year, showmonth: month })
  }

  getExpenseFunc = () => {
    const data = {}
    let year = ''
    let month = ''
    return (
      getExpenses(this.props.user)
        .then(res => {
          // sort each expense data by month/year- use date if available else use created date
          res.data.forEach(expense => {
            if (expense.date !== null) {
              year = expense.date.slice(0, 4)
              month = expense.date.slice(5, 7)
            } else {
              year = expense.created_on.slice(0, 4)
              month = expense.created_on.slice(5, 7)
            }
            this.dataSortHelper(year, month, expense, data)
          })
          this.setState({ expensedata: data })
          console.log(this.state.expensedata, this.state.showyear, this.state.showmonth)
        })
        .catch(console.error)
    )
  }

  // helper function to sort data by month/year into a hash-map
  dataSortHelper = (year, month, expense, data) => {
    if (data[year]) {
      if (data[year][month]) {
        data[year][month].push(expense)
      } else {
        data[year][month] = []
        data[year][month].push(expense)
      }
    } else {
      data[year] = {}
      data[year][month] = []
      data[year][month].push(expense)
    }
  }

  onAdd = (e) => {
    e.preventDefault()
    console.log('add')
  }

  render () {
    const { expensedata, showmonth, showyear } = this.state

    let expJsx = (

      <tr><th>-----No Expenses This Month-----</th></tr>
    )

    if (Object.keys(expensedata).length !== 0) {
      console.log('a')
      if (expensedata[showyear]) {
        if (expensedata[showyear][showmonth]) {
          expJsx = (
            expensedata[showyear][showmonth].map((expense, idx) => {
              return (
                <tr key={expense.id}>
                  <th>{idx}</th>
                  <th>{expense.expense_item}</th>
                  <th>{expense.expense_amount}</th>
                  <th>{expense.expense_tag}</th>
                  <th>{expense.data ? expense.data : expense.created_on}</th>
                </tr>
              )
            })
          )
        }
      }
    }

    return (
      <div className='expenses__wrapper'>
        <div className='expenses__heading'>
          <h2>Expenses</h2>
          <span>Add Expense</span>
          <AddCircleIcon fontSize='large' onClick={this.onAdd} />
        </div>
        <div className='expense__board'>
          <Table>
            <thead>
              <tr key='head'>
                <th>#</th>
                <th>Description</th>
                <th>Expense Amount</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expJsx}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default Expenses
