"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader for data fetching
  const { data: session, status } = useSession(); // Add session status check
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
        setLoading(true); // Start loading when fetching data
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching prompts:", error);
        } finally {
          setLoading(false); // Stop loading after fetching is done
        }
      } else if (status === "unauthenticated") {
        // Redirect to home if the user is unauthenticated
        router.push("/");
      }
    };

    if (status === "authenticated") {
      fetchPrompts();
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loader className="h-screen" />;
  }

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
