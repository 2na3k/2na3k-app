import React from 'react';

const ContactContent: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Contact Information</h2>
      <p>
        <strong>Email:</strong> example@example.com
      </p>
      <p>
        <strong>Phone:</strong> (123) 456-7890
      </p>
      <p>
        <strong>Website:</strong> <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">example.com</a>
      </p>
    </div>
  );
};

export default ContactContent;
