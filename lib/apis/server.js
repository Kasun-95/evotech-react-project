// import ky from "ky";
import { api } from "@/lib/api";

export const loginUser = async (loginData) => {
  // console.log(loginData);
  const response = await fetch("http://localhost:3001/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    }),
  });

  console.log("LOGIN ACTION", response.json());
};

export const registerUser = async (formData) => {
  try {
    const response = await api.post("v1/register", { json: formData });

    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }
  } catch (error) {
    const status = error.response.status;
    const responseBody = await error.response.json();
    if (status && responseBody) {
      if (status === 409) {
        return responseBody;
      }
      return undefined;
    }

    return undefined;
  }
};

export const getMovies = async () => {
  try {
    const response = await api.get("v1/movies", {
      cache: "no-store",
    });

    if (response.ok) {
      return response.json();
    } else {
      return { error: true, message: "Something went wrong!" };
    }
  } catch (error) {
    if (error) {
      if (error.message === "fetch failed") {
        return { error: true, message: "Database connection failed!" };
      } else {
        // Handle HTTP errors specifically
        const status = error?.response?.status; // HTTP status code (e.g., 404, 500)
        const responseBody = await error?.response?.json(); // Parse the response body if possible

        console.log("HTTP Error:", status, responseBody);
      }
    } else {
      // Handle non-HTTP errors (e.g., network issues)
      console.log("Unknown error:", error);
    }
    return undefined;
  }
};
