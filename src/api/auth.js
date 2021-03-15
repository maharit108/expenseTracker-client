import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/api/profile/',
    headers: {
      'Authorization': ''
    },
    data: {
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      nick_name: credentials.nickName
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/api/login/',
    method: 'POST',
    data: {
      username: credentials.email,
      password: credentials.password
    }
  })
}

export const deleteUser = user => {
  return axios({
    url: apiUrl + `/api/profile/${user.user_id}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + `/api/profile/${user.user_id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      password: passwords.password
    }
  })
}

export const getExpenses = (user) => {
  return axios({
    url: apiUrl + '/api/expenses/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const addExpenses = (user, data) => {
  return axios({
    url: apiUrl + '/api/expenses/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      expense_item: data.item,
      expense_amount: data.amount,
      expense_tag: data.tag,
      date: data.date
    }
  })
}

export const editExpenses = (user, data, expenseId) => {
  return axios({
    url: apiUrl + `/api/expenses/${expenseId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      expense_item: data.item,
      expense_amount: data.amount,
      expense_tag: data.tag,
      date: data.date
    }
  })
}

export const delExpenses = (user, expenseId) => {
  return axios({
    url: apiUrl + `/api/expenses/${expenseId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
