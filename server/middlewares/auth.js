module.exports = {
    mustBeLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) return res.redirect('/login?redirect='+req.path);
        res.locals.user = req.user;        
        next();
    },
    mustNotBeLoggedIn:(req,res,next)=>{
        if(req.isAuthenticated()) return res.redirect('/home');
        next();
    }
}