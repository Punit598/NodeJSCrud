const {sql,poolpromise} = require('../database/db.js')
const fs = require('fs');
//const data = require('../routes/query.json')
//const rawdata = fs.readFileSync(data);
//const queries = JSON.parse(rawdata);
const  moment = require('moment')
console.log(moment(new Date()).format('DD/mm/yyyy hh:mm:ss'))
const date = moment(new Date()).format('DD/mm/yyyy hh:mm:ss')
class UserController {
    async getAllUser(req, res) {
        try {

            const pool = await poolpromise
            const result = await pool.request()
                .query('SELECT TOP(5) * FROM [dbo].[users]', function (err, profiler) {
                    if (err) {
                        console.log('Something went wrong or  error')
                    } else {
                        const send_data = profiler.recordset;
                        res.json(send_data);
                    }
                })
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    }

    async addUser(req, res) {
        try {
            if(req.body.userid === '' || req.body.userid === null){
                 return  res.status(400).json({message:'\'Userid Cannot be empty\''})
            }
            console.log(Date(),'Date Time')
            const pool = await  poolpromise
            const result = pool.request()
                .input('userid',sql.Int,req.body.userid)
                .input('username',sql.VarChar(250),req.body.username)
                .input('profilepicture',sql.VarChar(250),req.body.profilepicture)
                .input('createdby',sql.Int,req.body.createdby)
                .input('lastmodifiedby',sql.Int,req.body.lastmodifiedby)
                .input('mobileno',sql.BigInt,req.body.mobileno)
                .input('emailid',sql.VarChar(250),req.body.emailid)
                .input('countryid',sql.Int,req.body.countryid)
                .input('isactive',sql.Bit,req.body.isactive)
                .input('lastmodifiedon',sql.DateTime, req.body.lastmodifiedon)
                .input('createdon',sql.DateTime,req.body.createdon)
                .input('passwordsalt',sql.VarChar(250),req.body.passwordsalt)
                .input('accountid',sql.Int,req.body.accountid)
                .execute('InsertUser').then(function (recordSet){
                    res.status(200).json({status:'success'})
                })
        } catch (e) {
            res.status(500)
            res.send(e.message)
        }
    }
    async updateUser(req,res){
        try{
            if(req.body.userid === ''|| req.body.userid === undefined || req.body.userid ===null){
                return  res.status(400).json({message:'\'Userid Cannot be empty\''})
            }
            const  pool = await  poolpromise
            const result = pool.request()
                .input('userid',sql.Int,req.body.userid)
                .input('username',sql.VarChar(250),req.body.username)
                .input('profilepicture',sql.VarChar(250),req.body.profilepicture)
                .input('createdby',sql.Int,req.body.createdby)
                .input('lastmodifiedby',sql.Int,req.body.lastmodifiedby)
                .input('mobileno',sql.BigInt,req.body.mobileno)
                .input('emailid',sql.VarChar(250),req.body.emailid)
                .input('countryid',sql.Int,req.body.countryid)
                .input('isactive',sql.Bit,req.body.isactive)
                .input('lastmodifiedon',sql.DateTime, req.body.lastmodifiedon)
                .input('createdon',sql.DateTime,req.body.createdon)
                .input('passwordsalt',sql.VarChar(250),req.body.passwordsalt)
                .input('accountid',sql.Int,req.body.accountid)
                .execute('UpdateUser',function (err,recordSet){
                    if(err){
                        res.status(400).json({status:'fail'},err)
                    }
                    else{
                        recordSet.recordset;
                        res.status(200).json({status:'success'})
                    }

                })

        }
        catch (e){
           /*console.log(res.status(400))*/
            res.status(500)
            res.send(e.message)
        }
    }
    async deleteUser(req,res){
        try{
            if(req.body.userid === ''|| req.body.userid === undefined || req.body.userid ===null){
                return  res.status(400).json({message:'\'Userid Cannot be empty\''})
            }
            const  pool = await  poolpromise
            const result = pool.request()
                .input('userid',sql.Int,req.body.userid)
                .execute('UpdateUser',function (err,recordSet){
                    if(err){
                        res.status(400).json({status:'fail'},err)
                    }
                    else{
                        recordSet.recordset;
                        res.status(200).json({status:'success'})
                    }

                })
        }
        catch (e) {
            res.status(500)
            res.send(e.message)
        }
    }
}
    const controller = new UserController()
    module.exports = controller;