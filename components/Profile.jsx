import Loader from "./Loader";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  image,
  data,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <section className="w-full">
        <h1 className="head_text text-left">
          <span className="orange_gradient">{name} Profile</span>
        </h1>
        <p className="desc text-left">{desc}</p>

        {loading ? (
          <Loader className="mt-16" />
        ) : (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">AI Prompts</h2>{" "}
            {/* Title for Prompts */}
            <div className="prompt_layout">
              {data.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  post={prompt}
                  handleEdit={() => handleEdit(prompt)}
                  handleDelete={() => handleDelete(prompt)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
