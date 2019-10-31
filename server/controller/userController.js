const bcyrpt =  require('bcrypt');

module.exports ={
    register: async (req, res, next) => {
        const{email,password, username} = req.body;
        console.log(email, password, username)
        db = req.app.get('db')
        const foundUser = await db.find_user_by_email(email)
        if(foundUser.length){
            res.status(400).send('user already exist');
        }else{
            const saltRounds = 12;
            const salt = await bcyrpt.genSalt(saltRounds);
            const hashedPassword = await bcyrpt.hash(password, salt);
            const [newUser] = await db.create_user([email, hashedPassword, username]).catch(err => {
                console.log(err)
            })
            req.session.user = newUser;
            res.status(200).send(req.sesson.user)
        }
    },
    login: (req, res, next) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        db.find_user_by_email(email).then(([foundUser]) => {
            if(!foundUser){
                res.status(400).send('go log in')
            }else{
                bcyrpt.compare(password, foundUser.password).then(isAuthenticated => {
                    if(isAuthenticated){
                    req.session.user = {
                        user_id: foundUser.user_id,
                        username: foundUser.username,
                        email: foundUser.email
                    }
                    res.status(200).send(req.session.user)
                }else{
                    res.status(400).send('feeed')
                }

                })
            }
        })

    },
    logout: (req, res, next) => {
req.session.destroy()
res.status(200).send('dead')
    },
    userSession: (req, res, next) => {
        res.status(200).send(req.session.user)
    },
}