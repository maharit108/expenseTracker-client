import React, { Component } from 'react'

import { getExpenses } from '../../../api/auth.js'
import './Expenses.css'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import Table from 'react-bootstrap/Table'

class Expenses extends Component {
  constructor () {
    super()
    this.state = {
      expensedata: {},
      showyear: '',
      showmonth: '',
      monthName: {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'Aug',
        '09': 'Sept',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      }
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
      if (expensedata[showyear]) {
        if (expensedata[showyear][showmonth]) {
          expJsx = (
            expensedata[showyear][showmonth].map((expense, idx) => {
              return (
                <tr key={expense.id}>
                  <td><EditIcon /> </td>
                  <th>{idx}</th>
                  <td>{expense.expense_item}</td>
                  <td>$ {expense.expense_amount}</td>
                  <td>{expense.expense_tag}</td>
                  <td>{expense.data ? expense.data : expense.created_on}</td>
                  <td><DeleteForeverIcon /> </td>
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
          <div className='expenses__heading__left'> <h3>Expenses</h3> </div>
          <div className='expenses__heading__center'>
            <ArrowLeftIcon fontSize='large' />
            <h4>{this.state.monthName[showmonth]}, {showyear}</h4>
            <ArrowRightIcon fontSize='large' />
          </div>
          <div className='expenses__heading__right'>
            <AddCircleIcon fontSize='large' onClick={this.onAdd} />
          </div>
        </div>
        <div className='expense__board'>
          <Table>
            <thead>
              <tr key='head'>
                <th></th>
                <th>SN</th>
                <th>Description</th>
                <th>Expense Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th></th>
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
