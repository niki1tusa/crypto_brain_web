import bcrypt from "bcryptjs";

export const hashedPasswordFnc = async (password:string) => {
   return bcrypt.hashSync(password, 5)
} 