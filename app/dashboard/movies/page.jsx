// import { SiImdb } from "react-icons/si";
import { Suspense } from "react";
import Link from "next/link";
import { Eye, Shell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MovieData from "./movie-data";

export default function MoviesPage() {
  // 1. Add shadcn Card
  // 2. Create Movies GET endpoint
  // 3. Read the dummy response
  // 4. Render data set in the UI
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href={"/movies"}>
          <Button variant="outline">
            <Eye />
            View as User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movies Management</CardTitle>
          <CardDescription>
            View and manage all the listed movie entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-[186px]">
                <Shell className="animate-spin duration-1000 text-purple-600" />
              </div>
            }
          >
            <MovieData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
