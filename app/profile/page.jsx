"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); // Adding session status
  const router = useRouter();

  // Edit handler to navigate to update prompt page
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) {
      return;
    }
    try {
      const response = await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const filteredPrompts = data.filter((item) => item._id !== prompt._id);
        setData(filteredPrompts);
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      if (session?.user.id) {
        // Ensuring session is loaded before fetching
        setLoading(true);
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching prompts:", error);
        }
        setLoading(false);
      } else {
        router.push("/");
      }
    };

    fetchPrompts();
  }, [session]);

  // Render a loading state when session is being loaded
  if (status === "loading") {
    return <Loader className={"h-screen"} />;
  }

  // Return Profile component once session is loaded
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      image={session?.user.image}
      data={data}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default MyProfile;
