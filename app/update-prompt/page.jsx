import { Suspense } from "react";
import UpdatePrompt from "./UpdatePrompt"; // Assuming your component is in this file
import Loader from "@components/Loader";
const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<Loader className={"h-screen"} />}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;
