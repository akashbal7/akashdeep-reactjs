import React, { useState } from "react";
import Button from "./SmallComponents/Button/Button";
import Label from "./SmallComponents/Label";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to API)
    console.log("Form submitted:", formData);
    alert("Message sent successfully");
  };

  return (
    <section className="flex">
      <div></div>
      <div className="p-8 mx-auto max-w-screen-md border rounded-2xl shadow-2xl">
        <Label
          className="block mb-4 text-4xl tracking-tight font-extrabold text-center text-emerald-400"
          children="Contact Us"
        />
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              children="Your email"
            />
            <input
              type="email"
              id="email"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg shadow-slate-200  border-slate-400 focus:outline-none"
              placeholder="name@flowbite.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label children="Subject" />
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg shadow-slate-200 focus:outline-none"
              placeholder="Let us know how we can help you"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <Label children="Your message" />
            <textarea
              id="message"
              rows="6"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg shadow-slate-200 focus:outline-none"
              placeholder="Leave a comment..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <Button children="Send message" />
        </form>
      </div>
      <div></div>
    </section>
  );
};

export default ContactUs;
