const Sequelize = require('sequelize')
const db = require('../db')

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
    min: Date.now
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    min: Date.now
  }
})

module.exports = Event;
