import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

const ContactContent: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-16 h-16 bg-gradient-to-b from-red-400 to-red-600 rounded-lg flex items-center justify-center">
        <Mail size={32} className="text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Get in Touch</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Contact Information</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
        <Phone size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">(+84) 38 350 4120</p>
        </div>
      </div>
      
      <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
        <Mail size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Email</h3>
          <a href="mailto:thanhlc.cv@gmail.com" className="text-sm text-blue-500 hover:underline">
            thanhlc.cv@gmail.com
          </a>
        </div>
      </div>

      <div className="flex items-center bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
        <Globe size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Website</h3>
          <a href="https://github.com/2na3k" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
            github.com/2na3k
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ContactContent;
