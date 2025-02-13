"use server";

import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Movies related server actions
export const createMovie = async (movie) => {
  try {
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

// Update movie server action
export const updateMovie = async (id, movie) => {
  try {
    const result = await db
      .collection("movies_n")
      .updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: movie },
        { upsert: true }
      );

    console.log(`A movie was updated with the _id: ${result.upsertedId}`);

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
