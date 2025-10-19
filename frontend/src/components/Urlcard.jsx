// import React, { useState } from "react";
// import toast from "react-hot-toast";

// export default function UrlCard({ link, onDelete }) {
//   const [loading, setLoading] = useState(false);

//   const API_BASE = import.meta.env.VITE_API_BASE || "https://shortly-x2lu.onrender.com/api/url";
//   const shortUrl =
//     link.shortUrl ||
//     `${(API_BASE.replace(/\/+$/, "")).replace("/api/url", "")}/${link.shortId}`;

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shortUrl);
//       toast.success("Copied to clipboard!");
//     } catch {
//       toast.error("Copy failed");
//     }
//   };

//   const handleDelete = async () => {
//     if (!onDelete) return;
//     if (!window.confirm("Are you sure you want to delete this URL?")) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/${link.shortId}`, { method: "DELETE", credentials:"include" });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("URL deleted!");
//       onDelete(link.shortId);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-6 w-full max-w-6xl mx-auto transition hover:shadow-xl">
//         <div className="flex-1 min-w-0">
//           <div className="text-sm text-gray-500">Original URL</div>
//           <div className="text-sm truncate break-all">{link.longUrl}</div>

//           <div className="mt-3 text-sm text-gray-500">Short URL</div>
//           <a
//             href={shortUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="block text-indigo-600 underline truncate max-w-full break-all"
//           >
//             {shortUrl}
//           </a>

//           <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-6">
//             <div>Clicks: <span className="font-medium">{link.clicks || 0}</span></div>
//             <div>Created: <span className="font-medium">{new Date(link.createdAt || Date.now()).toLocaleString()}</span></div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mt-4 md:mt-0">
//           <button
//             onClick={handleCopy}
//             className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
//           >
//             Copy
//           </button>
//           {onDelete && (
//             <button
//               onClick={handleDelete}
//               disabled={loading}
//               className="px-5 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50 transition"
//             >
//               {loading ? "Deleting..." : "Delete"}
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UrlCard({ link, onDelete }) {
  const [loading, setLoading] = useState(false);

  // Base API URL from Vite env
  const API_BASE = import.meta.env.VITE_API_BASE || "https://shortly-x2lu.onrender.com/api/url";

  // Construct short URL safely
  const shortUrl = link.shortUrl
    ? link.shortUrl
    : link.shortId
    ? `${API_BASE.replace(/\/+$/, "").replace("/api/url", "")}/${link.shortId}`
    : "#";

  // Copy to clipboard
  const handleCopy = async () => {
    if (!shortUrl || shortUrl === "#") {
      toast.error("Short URL not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Copy failed");
    }
  };

  // Delete URL
  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${link.shortId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Delete failed");
      }

      toast.success("URL deleted!");
      onDelete(link.shortId);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between gap-6 w-full max-w-6xl mx-auto transition hover:shadow-xl">
      {/* URL Details */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500">Original URL</div>
        <div className="text-sm truncate break-all">{link.longUrl}</div>

        <div className="mt-3 text-sm text-gray-500">Short URL</div>
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="block text-indigo-600 underline truncate max-w-full break-all"
        >
          {shortUrl}
        </a>

        <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-6">
          <div>
            Clicks: <span className="font-medium">{link.clicks || 0}</span>
          </div>
          <div>
            Created:{" "}
            <span className="font-medium">
              {new Date(link.createdAt || Date.now()).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <button
          onClick={handleCopy}
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Copy
        </button>
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-50 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
