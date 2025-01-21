// import { getMovies } from "../libs/apis/server";

// export default async function DashboardPage() {
//   // 1. Add shadcn Card
//   // 2. Create Movies GET endpoint
//   // 3. Read the dummy response
//   // 4. Render data set in the UI

//   const { movies } = await getMovies();

//   return (
//     <main>
//       {/* navigation bar */}
//       <nav className="bg-blue-300 w-full h-16 flex justify-start items-center">
//         <div className="container">
//           <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
//         </div>
//       </nav>

//       {/* body section */}
//       <div className="container mt-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {movies?.length &&
//             movies.map((movie) => (
//               <div key={movie.id} className="h-96 bg-green-400">
//                 {movie?.title}
//               </div>
//             ))}
//         </div>
//       </div>
//     </main>
//   );
// }
import Image from "next/image";
// import { SiImdb } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMovies } from "../libs/apis/server";

export default async function DashboardPage() {
  // 1. Add shadcn Card
  // 2. Create Movies GET endpoint
  // 3. Read the dummy response
  // 4. Render data set in the UI

  const moviesQuery = await getMovies();

  console.log("MOVIES FE : ", moviesQuery);

  return (
    <main>
      {/* navigation bar */}
      <nav className="bg-blue-300 w-full h-16 flex justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
        </div>
      </nav>

      {/* body section */}
      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moviesQuery?.length &&
            moviesQuery.map((movie) => (
              <div key={movie._id} className="h-[480px]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {movie?.title}{" "}
                      <span className="text-xs text-neutral-400 font-normal">
                        - {movie?.year ?? "N/A"}
                      </span>
                    </CardTitle>
                    <CardDescription className="sr-only">
                      {movie?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded">
                      <Image
                        src={movie?.poster}
                        alt={movie?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                        priority={true}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-[154px]">
                      {/* Movie Plot */}
                      <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                      {/* Movie Genres */}
                      <div className="text-sm text-blue-900 font-semibold">
                        {movie?.genres?.length && movie?.genres?.join(" / ")}
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <Badge variant="success" className="font-medium">
                          Rated:{movie?.rated ?? "N/A"}
                        </Badge>
                        <div
                          className="flex flex-row gap-1 items-center"
                          title="IMDb Rating"
                        >
                          {/* <SiImdb className="text-yellow-500 text-2xl" /> */}
                          <FaStar className="text-yellow-500" />
                          <span className="text-sm font-semibold">
                            {movie?.imdb?.rating ?? 0}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
