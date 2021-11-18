# MyWays-Nodejs-Backend-Task

I first created User Model for creating and reading documents from the underlying MongoDB database.

Some npm install libraries :
1. Express
2. body-parser
3. Mongoose

I used Postman to check all the APIs working perfectly.
Operations that have checked on Postman.
1. Create(Create name,email,reviews)
2. Login/Logout(For User)
3. Delete(Delete an user)
4. Modify or Update(Edit all reviews)


I've used Schema Middleware for User Authentication using JsonWebToken
Usually JsonWebToken has 2 operations for creating and verifying tokens.
1. jwt.sign({user.data},"String")
2. jwt.verify(token,"String")

