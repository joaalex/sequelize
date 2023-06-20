const express = require('express');
const app = express();
const mysql = require('mysql2');
const {Sequelize, DataTypes, where} = require('sequelize');
const { v4: uuidv4} = require('uuid');
const port = 2244

const sequelize = new Sequelize("realitor_api", "root", "root", {
  host : 'localhost',
  dialect : 'mysql'
});

const Agent = sequelize.define("agent", {
  agent_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  agent_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agent_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agent_phone: {
    type: DataTypes.STRING,
    allowNull: false
  }

});


sequelize.sync({
  // force: true,
})
.then(data =>{
  console.log('Model synced with table')
  // Agent.create({
  //   agent_id: uuidv4(),
  //   agent_name: 'Yinka',
  //   agent_email: "yinkaa@gmail.com",
  //   agent_phone: "0804014018"

  // })
  // .then(res => console.log("Inserted Successfully"));
  
  // Agent.findAll()
  // .then(res => {
  //   const resData = res.map(item => item.toJSON());
  //   console.log(resData);
  // });

  Agent.findAll({
    where:{
      agent_name: "yinka"
    }
  })
  .then(res => {
    const resData = res.map(item => item.toJSON());
    console.log(resData);
  });

})
.catch(err =>{ console.log("error: ", err.message) });

sequelize.authenticate()
.then(res => {
  console.log("db connected");
  app.listen(port , ()=>{
    console.log("api connected");
  })
})
.catch(err => console.log("error connecting"));