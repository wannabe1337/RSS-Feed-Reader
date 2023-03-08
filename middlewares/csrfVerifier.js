import crypto from 'crypto'
export const verifyCSRF = (req,res,next) => {
    const csrf=req.body._csrf
    const csrfToken=req.session.csrfToken
    if (csrfToken===csrf) {
        next()
        return
    }
    else{
        req.flash('failureInfo', "Forbidden, Invalid CSRF Token !!!")
        res.redirect('/error')
    }
}

export const genCSRFToken = (req,res,next) => {
    const csrf=crypto.randomBytes(64).toString('hex')
    req.session.csrfToken=csrf
    next()
}