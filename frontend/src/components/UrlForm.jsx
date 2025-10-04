import React, { useState } from "react";
import { createShort } from "../utils/api";

export default function UrlForm({ onCreate }) {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return alert("Please enter a URL");

    setLoading(true);
    try {
      const payload = { longUrl: longUrl.trim() };
      if (customAlias.trim()) payload.customAlias = customAlias.trim();

      const data = await createShort(payload);
      const shortUrl = data.shortUrl;

      onCreate(
        data.data
          ? data.data
          : {
              longUrl,
              shortId: shortUrl.split("/").pop(),
              clicks: 0,
              createdAt: new Date().toISOString(),
            },
        shortUrl
      );

      setLongUrl("");
      setCustomAlias("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create short URL");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center max-w-5xl mx-auto transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1 w-full">
        <input
          type="url"
          placeholder="Paste a long URL (https://...)"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-1 p-4 md:p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          className="w-full md:w-52 p-4 md:p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-3 md:mt-0 px-6 py-4 md:py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "Shorten"}
      </button>
    </form>
  );
}

