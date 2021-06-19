const handelSignup=(req,res,db,bcrypt)=>{
    const {username,email,password}=req.body;
    
    if(username&&email&&password){
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            username:username,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
    }else{
        res.status(400).json("fill the details");
    }
 
}
module.exports={
    handelSignup
}