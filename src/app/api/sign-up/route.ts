import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"


export async function POST(request: Request) {
    await dbConnect();
    try {
       const {username, email, password} = await request.json();
     const existingUserVerifiedByUsername =  await UserModel.findOne({
        username,
        isVerified: true
       })

       if(existingUserVerifiedByUsername){
          return Response.json({
            success: false,
            message: "Username is already taken"
          },{
            status: 400
          })
       }

       

    } catch (error) {
        console.log("Error register", error);
        return Response.json(
            {
                success: false,
                message: "Error register user"
            },
            {
             status: 500
            }
        )
    }
}