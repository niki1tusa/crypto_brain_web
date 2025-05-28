import { Passport } from "passport"
import  { ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt'
import { env } from "./env"
import { AppContext } from "./ctx"
import {type Express} from 'express'

export const applyPassportToExpressApp = (app: Express, ctx: AppContext) =>{

 const passport = new Passport()

 passport.use(
    new JWTStrategy({
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    },
    (jwtPayload: string, done)=>{
        ctx.prisma.user
        .findFirst({
            where: {id: jwtPayload}
        })
        .then((user)=>{
            if(!user){
                done(null, false)
                return 
            }
            done(null, user)
        })
        .catch((e)=>{
            done(e, false)
        })
    })
 )
 // next - tell to express app "go to next middleware"
 app.use((req, res, next)=>{
    if(!req.headers.authorization){
        next()
    }
    passport.authenticate('jwt', {session: false})(req, res, next)
 })
}

