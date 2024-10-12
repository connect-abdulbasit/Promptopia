import { Suspense } from "react";
import UpdatePrompt from "./UpdatePrompt"; // Assuming your component is in this file

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;
