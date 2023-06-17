# NodeJSCrud with Sql server
Simple Crud Operation using nodejs & Express with logs for backend while for Database we have used sqlserver.


USE [UTM]
GO

/****** Object:  StoredProcedure [dbo].[InsertUser]    Script Date: 17/06/2023 12:25:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[InsertUser]
@userid Int,
@username NVarChar(250),
@profilepicture VarChar(250),
@createdby Int,
@lastmodifiedby Int,
@mobileno BigInt,
@emailid VarChar(250),
@countryid Int,
@isactive Bit,
@lastmodifiedon DateTime,
@createdon DateTime,
@passwordsalt VarChar(250),
@accountid Int
AS
BEGIN
	Insert into users (username ,profilepicture,createdby,lastmodifiedby,mobileno,emailid ,countryid ,isactive ,lastmodifiedon,createdon ,passwordsalt,accountid) 
	Values (@username ,@profilepicture,@createdby,@lastmodifiedby,@mobileno,@emailid ,@countryid ,@isactive ,@lastmodifiedon,@createdon ,@passwordsalt,@accountid) 

End


GO



CREATE PROCEDURE [dbo].[UpdateUser]
@userid Int,
@username NVarChar(250),
@profilepicture VarChar(250),
@createdby Int,
@lastmodifiedby Int,
@mobileno BigInt,
@emailid VarChar(250),
@countryid Int,
@isactive Bit,
@lastmodifiedon DateTime,
@createdon DateTime,
@passwordsalt VarChar(250),
@accountid Int
AS
BEGIN
	update users 
	set 
    username =  @username ,
    profilepicture = @profilepicture,
    createdby = @createdby,
    lastmodifiedby =@lastmodifiedby,
    emailid        =   @emailid,
    mobileno       =  @mobileno ,
    countryid      =  @countryid ,
    isactive       =   @isactive,
    lastmodifiedon =    @lastmodifiedon ,
    createdon      =    @createdon,
    passwordsalt   =    @passwordsalt,
    accountid 	 = @accountid
	where users.userid = @userid

End



GO



CREATE PROCEDURE [dbo].[DeleteUser] 
@userId int
AS
BEGIN
		Delete users where userid = @userId
END


GO

