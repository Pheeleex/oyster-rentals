import React from 'react';

interface Order {
  carManufacturer: string;
  carModel: string;
  year: string;
  status: string; // Status can be "confirmed", "pending", or "cancelled"
}

interface TrackOrdersDialogBoxProps {
  orders: Order[];
  closeDialog: () => void;
}

const progressPercentage = {
  confirmed: 20,
};

const estimatedTime = '2 weeks'; // Hardcoded estimated time for confirmed orders

const TrackOrdersDialogBox: React.FC<TrackOrdersDialogBoxProps> = ({ orders, closeDialog }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-700">Your Pre-Orders</h3>
          <button
            className="text-red-500 hover:text-red-700 text-lg"
            onClick={closeDialog}
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-blue-700 mb-1">
                {order.carManufacturer} {order.carModel}
              </h4>
              <p className="text-sm text-gray-600 mb-2">Year: {order.year}</p>
              <p className={`text-sm mb-4 ${order.status === 'cancelled' ? 'text-red-600' : 'text-gray-600'}`}>
                Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </p>

              {/* Show progress bar only if status is "confirmed" */}
              {order.status === 'confirmed' && (
                <>
                  <div className="relative mb-4">
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <div
                        className="bg-blue-700 h-2.5 rounded-full"
                        style={{ width: `${progressPercentage.confirmed}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Progress: {progressPercentage.confirmed}% | Estimated Time: {estimatedTime}
                    </p>
                  </div>
                </>
              )}

              {/* Action button */}
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 w-full"
                onClick={() => alert(`Viewing details for ${order.carManufacturer} ${order.carModel}`)}
              >
                View Full Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrdersDialogBox;

