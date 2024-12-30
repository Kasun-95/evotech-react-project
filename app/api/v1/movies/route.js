import { NextResponse } from "next/server";

const MOVIES = [
  { id: 1, title: "Harry Potter 1" },
  { id: 2, title: "Load of the Rings" },
  { id: 3, title: "Hobbit" },
  { id: 4, title: "Insteller" },
  { id: 5, title: "Harry Potter 2" },
  { id: 6, title: "Harry Potter 3" },
  { id: 7, title: "Harry Potter 4" },
  { id: 8, title: "Harry Potter 5" },
];

export const GET = async (req) => {
  return NextResponse.json({ success: true, movies: MOVIES });
};
