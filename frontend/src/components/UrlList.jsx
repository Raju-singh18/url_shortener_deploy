 
import React from "react";
import UrlCard from "./Urlcard";

export default function UrlList({ urls, onRefresh }) {
  const handleDelete = (shortId) => {
    if (onRefresh) onRefresh(); // refresh list from backend
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 flex flex-col gap-4 px-4 md:px-0">
      {Array.isArray(urls) && urls.length > 0 ? (
        urls.map((url) => (
          <UrlCard
            key={url._id || url.shortId}
            link={url}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-slate-500 text-center py-8 bg-white rounded-xl shadow-md">
          No URLs yet. Start by creating a new short link!
        </p>
      )}
    </div>
  );
}


