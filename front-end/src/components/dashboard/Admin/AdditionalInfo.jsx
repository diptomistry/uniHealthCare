import React, { useState } from 'react';
import Button from '../../../layouts/dashboard/DutyRoster/Button';
const AdditionalInfo = () => {
  const [budget, setBudget] = useState(100000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tests, setTests] = useState([
    { id: 1, name: 'X-ray', count: 150 },
    { id: 2, name: 'Blood Test', count: 75 },
    { id: 3, name: 'MRI', count: 500 },
  ]);
  const [editingTest, setEditingTest] = useState(null);
  const [newTest, setNewTest] = useState({ name: '', count: '' });

  const handleBudgetEdit = () => {
    setIsEditingBudget(true);
  };

  const handleBudgetSave = () => {
    setIsEditingBudget(false);
  };

  const handleTestEdit = (test) => {
    setEditingTest(test);
  };

  const handleTestSave = (id) => {
    setTests(tests.map(test => test.id === id ? { ...test, count: editingTest.count } : test));
    setEditingTest(null);
  };

  const handleTestDelete = (id) => {
    setTests(tests.filter(test => test.id !== id));
  };

  const handleAddTest = () => {
    if (newTest.name && newTest.count) {
      const newTestEntry = {
        id: tests.length ? tests[tests.length - 1].id + 1 : 1,
        name: newTest.name,
        count: Number(newTest.count),
      };
      setTests([...tests, newTestEntry]);
      setNewTest({ name: '', count: '' });
    }
  };

  const handleClearCounts = () => {
    setTests(tests.map(test => ({ ...test, count: 0 })));
  };

  return (
    <div className="bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md p-24">
      <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Medical Center Budget This Year</h3>
        {isEditingBudget ? (
          <div className="flex items-center">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mr-2 border rounded p-1"
            />
            <button
              onClick={handleBudgetSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="mr-2">${budget.toLocaleString()}</span>
            <button
              onClick={handleBudgetEdit}
             
            >
              <Button title='Edit' />
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Total Tests Taken This Year</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 text-left">Test Name</th>
                <th className="px-4 py-2 border-b border-gray-200 text-left">Count</th>
                <th className="px-4 py-2 border-b border-gray-200 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {test.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {editingTest && editingTest.id === test.id ? (
                      <input
                        type="number"
                        value={editingTest.count}
                        onChange={(e) => setEditingTest({ ...editingTest, count: Number(e.target.value) })}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      `${test.count}`
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {editingTest && editingTest.id === test.id ? (
                      <button
                        onClick={() => handleTestSave(test.id)}
                        className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-hoverColor"
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTestEdit(test)}
                         
                        >
                          <Button title='Edit' />
                        </button>
                        <button
                          onClick={() => handleTestDelete(test.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            onClick={handleClearCounts}
            className="px-4 py-2 bg-secondaryColor text-white rounded hover:bg-hoverColor"
          >
            Clear All Counts
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Add New Test</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Test Name"
            value={newTest.name}
            onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
            className="border rounded p-1 w-full"
          />
          <input
            type="number"
            placeholder="Count"
            value={newTest.count}
            onChange={(e) => setNewTest({ ...newTest, count: e.target.value })}
            className="border rounded p-1 w-full"
          />
          <button
            onClick={handleAddTest}
            className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-hoverColor"
          >
            Add Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
