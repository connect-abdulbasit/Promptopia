import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const prompts = await Prompt.findById(id).populate("creator");
    if (!prompts) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
export const PUT = async (req, { params }) => {
  const id = params.id;
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompts = await Prompt.findById(id);
    if (!existingPrompts) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;
    await existingPrompts.save();
    return new Response(JSON.stringify(existingPrompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const prompts = await Prompt.findByIdAndDelete(id);
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
