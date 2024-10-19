import { connectToDB } from "@utils/database";
import IpAddress from "@models/IpAddress";

export async function GET(req) {
  try {
    // Retrieve the x-forwarded-for header if present
    const forwarded = req.headers.get("x-forwarded-for");

    // Get the IP address from the forwarded header or socket
    const ip = forwarded
      ? forwarded.split(",").pop().trim() // In case of multiple IPs, take the last one
      : req.socket.remoteAddress;
    console.log(ip);
    // Connect to the database
    await connectToDB();

    // Create a new IP document
    const ipEntry = new IpAddress({ ipaddress: ip });

    // Save the document to the database
    await ipEntry.save();

    // Return a successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: "IP address saved successfully",
        ip: ip,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving IP address:", error);

    // Return an error response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to save IP address",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
