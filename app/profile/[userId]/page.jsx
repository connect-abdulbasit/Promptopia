"use client";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const Page = () => {
  const { userId } = useParams();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/users/${userId}/posts`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setPrompts(data);

          // Assuming data[0].creator.username holds the user's name
          if (data.length > 0 && data[0].creator.username) {
            setName(data[0].creator.name);
            setUserName(data[0].creator.username); // Set the name from fetched data
          }
        } catch (error) {
          console.error("Error fetching prompts:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPrompts();
  }, [userId]);
  if (error) {
    return <div>Error: {error}</div>; // Display error if any
  }

  return (
    <Profile
      name="Creator's"
      desc={
        userName
          ? `Welcome to ${userName}'s profile! Discover their thoughts and prompts.`
          : ""
      }
      data={prompts}
      loading={loading}
    />
  );
};

export default Page;
