import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Product "Laptop Pro" is running low on stock. Current quantity: 5',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'success',
    title: 'Order Completed',
    message: 'Order #12345 has been successfully delivered',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Supplier Added',
    message: 'A new supplier "Tech Solutions" has been added to the system',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Payment Due',
    message: 'Payment for invoice #7890 is due in 3 days',
    time: '2 days ago',
    read: false,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
    case 'success':
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    case 'info':
      return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
    default:
      return <BellIcon className="h-6 w-6 text-gray-500" />;
  }
};

const getBgColor = (type: string) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-50';
    case 'success':
      return 'bg-green-50';
    case 'info':
      return 'bg-blue-50';
    default:
      return 'bg-gray-50';
  }
};

const Alerts: React.FC = () => {
  const [alertList, setAlertList] = useState(alerts);

  const markAsRead = (id: number) => {
    setAlertList(alertList.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const deleteAlert = (id: number) => {
    setAlertList(alertList.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {alertList.filter(alert => !alert.read).length} unread alerts
          </span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={() => setAlertList(alertList.map(alert => ({ ...alert, read: true })))}
          >
            Mark all as read
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {alertList.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`${getBgColor(alert.type)} backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getIcon(alert.type)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{alert.time}</span>
                      {!alert.read && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => markAsRead(alert.id)}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Mark as read
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteAlert(alert.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts; 