import { NextResponse } from "next/server";
import clientPromise from "@/app/libs/mongodb";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  /*
  Bind Database
  Find the user in database
  Check password validity
  Return the response with the token
  If password invalid return error response
  */

  try {
    const { name, email, password } = await req.json();
    // console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, Email and Password are required!",
        },
        { status: 400 }
      );
    }

    // TODO: You can do the further data validations here

    const client = await clientPromise();
    // sample_mflix is the database name
    const db = client.db("sample_mflix");

    const existingUser = await db.collection("users").findOne({ email });

    // console.log("Is existing user", existingUser);

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Hashed Password ", hashedPassword);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    if (result && result.acknowledged) {
      // console.log("MDB Result ", result);
      return NextResponse.json({
        success: true,
        user: {
          userId: result.insertedId,
          name,
          email,
        },
      });
    } else {
      return NextResponse.json(
        { error: "User registration failed!" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("MONGODB ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
