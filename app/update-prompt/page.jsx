"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Fetch the prompt details
  useEffect(() => {
    const fetchPromptDetails = async () => {
      if (!promptId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromptDetails();
  }, [promptId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update prompt");
      }
      router.push("/");
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading prompt details...</p>
      ) : (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default UpdatePrompt;
