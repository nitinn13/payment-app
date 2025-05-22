import { Router } from "express";
import { prisma } from "../src/prisma";
import zod from "zod";
import bcrypt from "bcryptjs";

const userRouter = Router();

userRouter.post("/signup", async (req, res)=>{
    try{
    const {name, email, password} = req.body;
    const correct = zod.object({
        name: zod.string().min(1),
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const user = correct.safeParse({name, email, password});

    const hashedpassword = await bcrypt.hash(password, 10);

    if(user.success){
        const newUser = await prisma.user.create({
            data: {
                name: user.data.name,
                email: user.data.email,
                password: hashedpassword
            }
        })
        res.status(200).json({message: "User created successfully"});
    }else{
        res.status(400).json({message: "Invalid data"});
    }
}
catch(e){
    res.send(e);

}

})


export default userRouter;
