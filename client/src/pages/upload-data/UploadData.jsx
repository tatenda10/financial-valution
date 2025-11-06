import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

const UploadData = () => {
  const navigate = useNavigate();
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
      // Navigate to financials tab with file
      navigate('/dashboard/financials', { state: { file: e.target.files[0] } });
    }
  };

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="bg-white border border-gray-200 p-6 rounded">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Upload Financial Data</h1>
          <p className="text-sm text-gray-600">
            Upload your Excel file to automatically populate financial data
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Upload Excel File</h3>
            <p className="text-xs text-gray-600 mb-4">
              Upload your financial data in Excel format (.xlsx or .xls)
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 cursor-pointer">
              <Upload className="h-4 w-4" />
              Choose File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">File Format Requirements</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Excel file (.xlsx or .xls format)</li>
              <li>• First column should contain financial metric names</li>
              <li>• Subsequent columns should be fiscal years (e.g., FY2012, FY2013, etc.)</li>
              <li>• First row should contain the year headers</li>
              <li>• Data rows should contain metric values for each year</li>
            </ul>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate('/dashboard/financials')}
              className="w-full px-4 py-3 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors rounded"
            >
              Or Enter Data Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;

