const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        const picture = `https://robohash.org/${username}.png`;
        
        const foundUser =  await db.check_user(username);
        if(foundUser[0]){
            return res.status(400).send("Username already registered")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user([username, hashedPassword, picture]);
        req.session.userid = {
            userid: newUser.id
        }
        res.status(200).send({
            id: newUser.id,
            username: newUser.username,
            picture: newUser.picture
        });
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        const foundUser =  await db.check_user(username);
        const user = foundUser[0];

        if(!user){
            return res.status(401).send("Incorrect login information")
        }

        const authenticated = bcrypt.compareSync(password, user.password);
        if(authenticated){
            req.session.userid = {
                userid: user.id
            }
            return res.status(200).send({
                id: user.id,
                username: user.username,
                picture: user.picture
            });
        }
        else {
            res.status(401).send("Incorrect login info");
        }
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const {userid} = req.session.userid
        
        const {userposts, search} = req.query
        const id = userid

        if(userposts === 'true' && search){
            const posts = await db.get_search_and_usersposts([search])
            console.log(posts)
            return res.status(200).send(posts)
        }
        if(userposts === 'false' && !search){
            const posts = await db.get_noUsers_noSearch(id);
            return res.status(200).send(posts);
        }
        if(userposts === 'false' && search){
            const posts = await db.get_noUsers_withSearch([search, id])
                return res.status(200).send(posts);
        }
         
         if(userposts === 'true' && !search){
            const posts = await db.get_all_posts();
            return res.status(200).send(posts);
        }
    },
    getPost: async (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const post = await db.get_post([id])
        
        return res.status(200).send(post)
    },

    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {userid} = req.session.userid;
        const {title, image, content} = req.body
        const id = userid

        const newPost = await db.add_post([title, content, image, id]);
        return res.status(200).send(newPost)
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {userid} = req.session.userid
        const post = await db.get_post([id])

        if(userid != post[0].id){
            return res.status(401).send('You can only delete posts that you created')
        } else {
            await db.delete_post([id])
            return res.status(200).send('Deleted')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
    },
    getMe: async (req, res) => {
        const {userid} = req.session.userid
       
        const db = req.app.get('db')

        const me = await db.get_me([userid])
        return res.status(200).send(me)
    }
   
   
 }