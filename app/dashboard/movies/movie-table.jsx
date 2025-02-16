"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditMovieForm from "./edit-movie-form";
import { updateMovie, deleteMovie } from "@/lib/actions/movie";
import DeleteMovieDialog from "./delete-movie-dialog";

export default function MovieTable({ movies }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleEditSubmit = async (movie) => {
    const { id, title, year, plot, rated, genres, poster, imdb } = movie;
    setIsSaving(true);
    const resp = await updateMovie(id, {
      title,
      year,
      plot,
      rated,
      genres,
      poster,
      imdb,
    });
    setIsSaving(false);
    if (resp?.success) {
      setEditingMovie(null);
      router.refresh();
    }
  };

  const handleDelete = (movie) => {
    setDeletingMovie(movie);
  };

  const handleDeleteConfirm = async (movieId) => {
    setDeleting(true);
    const resp = await deleteMovie(movieId);
    setDeleting(false);

    if (resp?.success) {
      setDeletingMovie(null);
      router.refresh();
    }
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      movie.title.toLowerCase().includes(query) ||
      (movie.genres &&
        movie.genres.some((genre) => genre.toLowerCase().includes(query)))
    );
  });

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Cover</TableHead>
            <TableHead className="font-bold">Movie Title</TableHead>
            <TableHead className="font-bold">Year</TableHead>
            <TableHead className="font-bold">Rated</TableHead>
            <TableHead className="font-bold">IMDb</TableHead>
            <TableHead className="font-bold">Genres</TableHead>
            <TableHead className="font-bold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMovies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <Image
                  src={movie.poster ?? "/images/avatar.jpg"}
                  alt="Poster"
                  width={80}
                  height={160}
                  className="w-20 h-auto aspect-auto"
                  priority
                />
              </TableCell>
              <TableCell>{movie?.title ?? "N/A"}</TableCell>
              <TableCell>{movie?.year ?? "N/A"}</TableCell>
              <TableCell>{movie?.rated ?? "N/A"}</TableCell>
              <TableCell>{movie?.imdb?.rating ?? "N/A"}</TableCell>
              <TableCell>{movie?.genres?.join(", ")}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="min-w-[120px]"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="min-w-[120px]"
                    onClick={() => handleDelete(movie)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          open={true}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingMovie(null)}
          isLoading={isSaving}
        />
      )}

      {deletingMovie && (
        <DeleteMovieDialog
          movie={deletingMovie}
          open={true}
          onCancel={() => setDeletingMovie(null)}
          onConfirm={() => handleDeleteConfirm(deletingMovie?.id)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
