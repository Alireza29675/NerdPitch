module.exports = {
    mustBeLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) return res.redirect('/login?redirect='+req.path);
        next();
    },
    mustNotBeLoggedIn:(req,res,next)=>{
        if(req.isAuthenticated()) return res.redirect('/home');
        next();
    }
}