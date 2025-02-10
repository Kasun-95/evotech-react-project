"use server";

import clientPromise from "@/lib/mongodb";

// Movies related server actions
export const createMovie = async (movie) => {
  try {
    const client = await clientPromise(); // Mongodb client
    const db = client.db("sample_mflix"); // Database instance
    // Create movie query
    const result = await db.collection("movies_n").insertOne(movie);

    console.log(`A movie was inserted with the _id: ${result.insertedId}`);

    if (result.acknowledged) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Mongodb insert failed!", error);
    return { success: false, error };
  }
};
