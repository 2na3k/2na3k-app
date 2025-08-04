import React from 'react';
import onTheCover from '../static/images/on-the-cover.jpg';

const ImagePreviewContent: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-auto">
    <img src={onTheCover} alt="cover.jpg" className="max-w-full max-h-full object-contain" />
  </div>
);

export default ImagePreviewContent;
