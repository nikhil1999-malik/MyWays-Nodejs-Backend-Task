const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("./Middleware/User")
const bodyParser = require("body-parser")
const auth = require("./Middleware/auth")

const app = new express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// //  Blog / Review
// //1 Create
// 2. login
// 3.Logout
// 4. Update/Modify
// 5.Delete

//Signup

app.post("/signup", async (req, res) => {
    const { name, email, review, password } = req.body;

    const user = new User({
        email,
        name,
        review,
        password
    })
    try {
        await user.save()
        res.send(user)
    }
    catch (e) {
        res.send({ message: "Data isnt saved" })
    }


})

//Login

app.get("/login/user", async (req, res) => {

    try {
        const user = await User.FindCredentails(req.body.email, req.body.password);
        // const token = await user.generateAuthToken()
        res.send({ user })
    } catch (e) {
        res.status(400).send()
    }

})

//get users

app.get("/user/me", auth, (req, res) => {
    res.send(req.user)
})


//logout

app.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()

    } catch (e) {
        console.log(e)
    }
})

// router.post('/users/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await req.user.save()

//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

//Update or Modify
//Edit an Blog/Review

app.patch("/user/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))


    if (!isValidOperation) {
        return res.status(400).send({ error: "INvalid Updates!" })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)


    } catch (e) {
        res.status(404).send()
    }
})

//Delete

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        return res.status(404).send()
    }
})


app.listen(3000, () => {
    console.log('Port is live on 3000')
})