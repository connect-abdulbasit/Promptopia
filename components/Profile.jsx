import Loader from "./Loader";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  image,
  data,
  handleEdit,
  handleDelete,
  loading,
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
          <div className="mt-10 prompt_layout">
            {data.map((prompt) => (
              <PromptCard
                key={prompt._id}
                post={prompt}
                handleEdit={() => handleEdit(prompt)}
                handleDelete={() => handleDelete(prompt)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
