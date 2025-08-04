import React from 'react';
import cv from '../static/files/cv.pdf';

const PdfPreviewContent: React.FC = () => {
  return (
    <div className="bg-white h-full w-full">
      <iframe src={cv} className="w-full h-full" title="CV Preview" />
    </div>
  );
};

export default PdfPreviewContent;
