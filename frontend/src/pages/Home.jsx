import React, { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { listUrls } from "../utils/api";

export default function Home() {
  const [urls, setUrls] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await listUrls();
      if (Array.isArray(res.urls)) setUrls(res.urls);
      else setUrls([]);
    } catch (err) {
      console.error("Failed to fetch urls", err);
      setUrls([]);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = (doc, fullShortUrl) => {
    const item =
      doc && doc.longUrl
        ? {
            _id: doc._id,
            longUrl: doc.longUrl,
            shortId:
              doc.shortId || (fullShortUrl && fullShortUrl.split("/").pop()),
            shortUrl: fullShortUrl,
            clicks: doc.clicks || 0,
            createdAt: doc.createdAt || new Date().toISOString(),
          }
        : {
            longUrl: doc.originalUrl || "",
            shortUrl: fullShortUrl,
          };

    setUrls((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Form Section */}
        <div className="rounded-2xl shadow-lg p-6 md:p-8">
          <UrlForm onCreate={handleCreate} />
        </div>

        {/* URL List Section */}
        <div className="rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            Your Shortened URLs
          </h2>
          <UrlList urls={urls} onRefresh={fetchAll} />
        </div>
      </div>
    </div>
  );
}
