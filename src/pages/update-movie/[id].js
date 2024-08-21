import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "@/components/layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import DropImageIcon from "@/components/DropImageIcon";
const { storage, ref, uploadBytesResumable, getDownloadURL } = require("../../../firebaseConfig.js");

const UpdateMovie = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);

  useEffect(() => {
    // Fetch existing movie details when component mounts
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`/api/movies/${id}`);
      const movie = await response.json();
      setTitle(movie.title);
      setPublishingYear(movie.publishingYear);
      setImageURL(movie.poster);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    await uploadImage(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    await uploadImage(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadImage = async (file) => {
    if (!file) return;
    setUploading(true);

    const storageRef = ref(storage, `movies/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
        setUploading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayLoader(true);

    const formData = {
      title,
      publishingYear,
      poster: imageURL, // Using the uploaded image URL
    };

    try {
      const response = await fetch(`/api/update-movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Movie updated successfully!');
        router.push('/movies'); // Navigate to the movies list or another page
      } else {
        toast.error('Failed to update movie.');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
        setDisplayLoader(false);
    }
  };

  const handleCancel = () => {
    router.push('/movies'); // Navigate to the movies list or another page
  };

  return (
    <Layout title="Update Movie">
        {
            displayLoader && <LoadingSpinner />
        }
      <form onSubmit={handleSubmit} className="flex gap-28">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="file-upload-container cursor-pointer flex items-center justify-center rounded-xl border-2 border-dashed border-white w-[400px] h-[400px] bg-[#224957]"
        >
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center w-full h-full"
          >
            {uploading ? (
              <p className="text-gray-500">Uploading...</p>
            ) : imageURL ? (
              <img
                src={imageURL}
                alt="Uploaded"
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <>
                <DropImageIcon/>
                <span>
                    Drop an image here
                </span>
              </>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="other-fields flex flex-col gap-12">
          <div className="user-inputs flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="placeholder-white font-normal rounded-lg w-80 h-11 p-4 bg-[#224957]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="publishingYear"
              placeholder="Publishing Year"
              className="placeholder-white font-normal rounded-lg w-52 h-11 p-4 bg-[#224957]"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
            />
          </div>
          <div className="form-buttons flex gap-4">
            <button type="button" onClick={handleCancel} className="border-2 rounded-lg w-36 font-bold h-14 border-white bg-[#093545]">
              Cancel
            </button>
            <button type="submit" disabled={uploading || displayLoader} className="rounded-lg w-36 font-bold h-14 bg-[#2BD17E]">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateMovie;
