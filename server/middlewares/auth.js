module.exports = {
    mustBeLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) return res.redirect('/login?redirect='+req.path);
        global.user = req.user;        
        next();
    },
    mustNotBeLoggedIn:(req,res,next)=>{
        if(req.isAuthenticated()) return res.redirect('/home');
        next();
    }
}