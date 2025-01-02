import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, User, Upload } from 'lucide-react';
import { updateForm, submitForm } from '../store/FormSlice/FormSlice';

const FormPage = () => {
  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    file: null
  });
  const dispatch = useDispatch();
  const { formData, error } = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    dispatch(updateForm({
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(submitForm({ ...formData }));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Form Page</h2>
            <p className="mt-2 text-gray-600">We'd love to hear from you</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={FormData.name}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-200 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="...."
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={FormData.email}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-200 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="..."
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload File
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="relative rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-indigo-500 transition-colors">
                  <div className="flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400 mr-2" />
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;