const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const workshop=require('./ecrWorkshopFlow')
const authorize=require('./logging')
const seminar=require('./ecrSeminarFlow')
const ecrFilter=require('./ecrFilter')
const cfilter=require('./commonFilter')
const load=require('./loadAndApprove')
const iv=require('./iv_workflow')
const setaf = require('./SetafBackend')
const setaffilter = require('./setafFilter')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/ecr',workshop)
app.use('',authorize)
app.use('/seminar',seminar)
app.use('/ecrFilter',ecrFilter)
app.use('/cfilter',cfilter)
app.use('/load',load)
app.use('/iv',iv)
app.use('/setaf',setaf)
app.use('/setaffilter',setaffilter)


app.listen(1234,()=>{
    console.log("App is running")
})