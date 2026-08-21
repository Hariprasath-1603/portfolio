import React, { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import DraggableWindow from "../shared/DraggableWindow";
import { calculateWindowBounds } from "../../utils/helpers";

const EMAILJS_PUBLIC_KEY = 'eOIaJ6sq7tETY7HYp';
const EMAILJS_SERVICE_ID = 'service_uzk19vb';
const EMAILJS_TEMPLATE_ID = 'template_j5btg4p';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const Contact = ({ isAppOpen, toggleContact, isActive, bringToFront, minimizeWindow, isMinimized }) => {
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const formRef = useRef();

  const bounds = useMemo(() => calculateWindowBounds(400, 600), []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.lname || !formData.email || !formData.message) {
      setStatus({ ...status, error: "⚠️ Please fill in all required fields." });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${formData.fname} ${formData.lname}`.trim(),
        from_email: formData.email,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      });
      setFormData({ fname: "", lname: "", email: "", message: "" });
      setStatus({ loading: false, success: true, error: null });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus({ loading: false, success: false, error: "❌ Failed to send. Please email me directly." });
      setTimeout(() => setStatus(s => ({ ...s, error: null })), 6000);
    }
  };

  return (
    <DraggableWindow
      isOpen={isAppOpen}
      isMinimized={isMinimized}
      title="Contact"
      icon="/images/apps/contact.svg"
      onClose={toggleContact}
      onMinimize={minimizeWindow}
      bringToFront={bringToFront}
      isActive={isActive}
      bounds={bounds}
      className="bg-[#111111] w-[32em] h-[42em]"
    >
      <div className="h-full w-full flex flex-col p-8 text-white overflow-y-auto box-border">
        <div className="mb-6">
          <div className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">Contact</div>
          <h2 className="text-3xl font-light mb-2">Say <em className="text-blue-400 italic">Hello !</em></h2>
          <p className="text-gray-400 text-sm">Have a project in mind? Let's build something amazing together.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 flex-grow w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fname" className="text-xs text-gray-300">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="John"
                value={formData.fname}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="lname" className="text-xs text-gray-300">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Doe"
                value={formData.lname}
                onChange={handleChange}
                className="bg-white/10 border border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <label htmlFor="message" className="text-xs text-gray-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me about your project…"
              value={formData.message}
              onChange={handleChange}
              className="bg-white/10 border border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none flex-grow"
              required
            ></textarea>
          </div>
          
          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={status.loading}
              className="bg-white text-black hover:bg-gray-200 transition-colors px-6 py-2 rounded-full font-medium text-sm disabled:opacity-50"
            >
              {status.loading ? 'Sending…' : 'Send Message →'}
            </button>
            {status.success && <p className="text-green-400 text-xs">🎉 Message sent! I'll get back to you soon.</p>}
            {status.error && <p className="text-red-400 text-xs">{status.error}</p>}
          </div>
        </form>
      </div>
    </DraggableWindow>
  );
};

Contact.propTypes = {
  isAppOpen: PropTypes.bool.isRequired,
  toggleContact: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  bringToFront: PropTypes.func.isRequired,
  minimizeWindow: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool,
};

export default React.memo(Contact);


