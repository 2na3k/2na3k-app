import React from 'react';

interface TextPreviewWindowProps {
  title: string;
  content: string;
}

const TextPreviewWindow: React.FC<TextPreviewWindowProps> = ({ title, content }) => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default TextPreviewWindow;
