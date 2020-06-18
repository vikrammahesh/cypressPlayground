
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const fs=require('fs-extra')
const path=require('path')
const { config } = require('dotenv')
const mysql=require('mysql')

module.exports = (on, config) => {

const dashboardDb = process.env.DASHBOARD_DB || config.env.DASHBOARD_DB;
const dashboardDbUser = process.env.DASHBOARD_USER || config.env.DASHBOARD_USER;
const dashboardDbPassword = process.env.DASHBOARD_PWD || config.env.DASHBOARD_PWD;
const conPort = process.env.PORT || config.env.PORT || 3306;

var dbconnection=null;

var dashboard={
  'database': dashboardDb,
  'user': dashboardDbUser,
  'password':dashboardDbPassword,
  'port':conPort
}

function connect(connectionObj){
  connectionObj.host= connectionObj.host !== undefined ? connectionObj.host : 'localhost';
  connectionObj.insecureAuth=true;
  dbconnection=mysql.createConnection(dashboard);
  dbconnection.connect();
  return dbconnection;
}

function executeQuery(sqlQuery){
  return new Promise( (resolve, reject) => {
    dbconnection.query(sqlQuery, function (err, result){
      if(err){
        console.log(err)
        reject(err)
      }
      console.log('executed query ' + sqlQuery)
      resolve(JSON.stringify(result))
    })
  })
}
//cy.task('runQuery', 'select status from report where id=16142')
on('task', {
  runQuery: ( {sqlQuery} ) =>{
      connect( eval(dashboard))
      console.log('Connection is established ....')
      return executeQuery(sqlQuery)
  }
})



  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  
  
  const userName = process.env.USER_NAME || config.env.userName
  const password = process.env.PASSWORD || config.env.password
  console.log(userName)
  console.log(password)
  console.log(process.env.ANDROID_HOME)
  config.env.userName=userName
  config.env.password=password

  const fileName=config.env.configFileName || 'qa'
  console.log("Environment..."+fileName);
  return readConfigFile(fileName);

  function readConfigFile(fileName){
      const filePath=path.resolve('.', 'cypress/config', `${fileName}.json`)  
      console.log(filePath)
      const json=fs.readJsonSync(filePath, 'utf-8')
      const configuration=JSON.parse(JSON.stringify(json))
      config.baseUrl=configuration.baseUrl;
      //console.log(config)
      return config
  }

}