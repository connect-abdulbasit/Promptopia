import React from "react";
import Link from "next/link";
import Loader from "./Loader"; // Assuming you store the loader in components folder

const ErrorPage = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-6">
        {statusCode || "Error"}
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        {statusCode
          ? `An error ${statusCode} occurred on the server.`
          : "An error occurred on the client."}
      </p>

      <Loader className="mb-8" />

      <Link href="/">
        <a className="text-lg text-blue-500 underline">
          Go back to the homepage
        </a>
      </Link>
    </div>
  );
};

// Optional: capture the status code
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
