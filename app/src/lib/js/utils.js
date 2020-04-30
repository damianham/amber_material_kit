'use strict'

import Auth from './auth'
import Resource from './resource'

export function round (value, precision) {
  let multi = 10
  precision -= 1

  while (precision > 0) {
    multi = multi * 10
    precision = precision - 1
  }

  return Math.round(value * multi) / multi
}

export const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export const bestTitleForClass = function (item, field) {
  if (field) {
    return item[field]
  }
  return item.title || item.name || item.username || item.email || item.code || item.id
}

export const titleForId = function (store, id, klazz) {
  if (typeof store.getState()[klazz] === 'undefined') return id
  const item = store.getState()[klazz].find((el) => { return el.id === id })
  return item ? bestTitleForClass(item) : id
}

export const optionsForClass = function (store, klazz, field) {
  if (typeof store.getState()[klazz] === 'undefined') return []
  return store.getState()[klazz].map((item) => {
    return { value: item.id, label: bestTitleForClass(item, field) }
  })
}

export const titlesForResource = function (delegate, endpoint) {
  if (typeof delegate[endpoint] !== 'undefined') {
    return delegate[endpoint].map((item) => {
      return { value: item.id, label: bestTitleForClass(item) }
    })
  }
  const res = new Resource(endpoint)

  res.all().then((resp) => {
    delegate.onLoaded(endpoint, resp)
  })

  return []
}

export const canEditItem = function (item) {
  if (Auth.isUserAuthenticated()) {
    const user = Auth.getUser()
    return user && (user.roles === 'admin' || user.id === item.user_id)
  }
  return false
}

export const blank = function (text) {
  if (typeof text === 'undefined') return true
  if (text === '') return true
  return false
}

export const short = function (text, len) {
  if (blank(text) || text.length < len) return true
  return false
}

export function validEmail (email) {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(email)
}

export function unitOptions (unit) {
  let units = {
    'm': ['METERS', 'FEET', 'INCHES', 'MILES', 'KM', 'YARDS', 'NM', 'FATHOMS'],
    'rad': ['RAD', 'DEG'],
    'm/s': ['MPS', 'MPH', 'KNOTS', 'KPH'],
    'K': ['C', 'F', 'K'],
    'J': ['KWH', 'EV', 'J'],
    'Pa': ['MB', 'PSI', 'Pa'],
    'DD': ['DDM', 'DD', 'DMS', 'GEO']
  }
  return units[unit] || [unit]
}
