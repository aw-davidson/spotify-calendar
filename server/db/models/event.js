const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    defaultValue: '(No title)'
  },
  description: {
    type: Sequelize.TEXT,
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
    min: Sequelize.NOW
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    min: Sequelize.NOW
  }
})

module.exports = Event;
