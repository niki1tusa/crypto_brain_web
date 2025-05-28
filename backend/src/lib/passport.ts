import { Passport } from "passport"
import  { ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt'
import { env } from "./env"
import { AppContext } from "./ctx"

export const applyPassportToExpressApp = (app: any, ctx: AppContext) =>{
 const passport = new Passport()

 passport.use(
    new JWTStrategy({
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(jwtPayload)=>{

    })
 )
}