import React from "react";

export default function About() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-600">About Shortly</h2>

      <p className="text-base text-slate-700 mb-5 leading-relaxed">
        <span className="font-semibold text-indigo-600">Shortly</span> is a full-stack URL shortening application built with real-world developer practices. 
        It enables users to generate concise, shareable links and track click analytics, demonstrating hands-on experience in end-to-end web development.
      </p>

      <p className="text-base text-slate-700 mb-5 leading-relaxed">
        The <span className="font-semibold text-indigo-500">backend</span> is implemented with <span className="font-semibold text-indigo-500">Node.js</span> and <span className="font-semibold text-indigo-500">Express</span>, 
        while <span className="font-semibold text-indigo-500">MongoDB</span> provides persistent storage. RESTful APIs handle link creation, redirection, and click tracking, showcasing skills in database modeling, API design, and server-side logic.
      </p>

      <p className="text-base text-slate-700 mb-5 leading-relaxed">
        The <span className="font-semibold text-indigo-500">frontend</span> leverages <span className="font-semibold text-indigo-500">React</span> with <span className="font-semibold text-indigo-500">Vite</span> for high performance, 
        and <span className="font-semibold text-indigo-500">Tailwind CSS</span> for a responsive, modern UI. Features include component-based architecture, state management, and dynamic routing using React Router.
      </p>

      <p className="text-base text-slate-700 leading-relaxed">
        This project demonstrates practical full-stack development skills, including building scalable APIs, integrating frontend and backend, implementing responsive design, and tracking user interactions — all relevant for professional software engineering roles.
      </p>
    </div>
  );
}
