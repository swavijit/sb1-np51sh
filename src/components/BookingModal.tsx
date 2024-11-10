import { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../types';
import { useStore } from '../lib/store';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: User;
}

export default function BookingModal({ isOpen, onClose, tutor }: BookingModalProps) {
  const { currentUser, createBooking } = useStore();
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    duration: 1,
    subject: tutor.subjects[0],
  });

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createBooking({
      studentId: currentUser.id,
      teacherId: tutor.id,
      subject: bookingData.subject,
      date: bookingData.date,
      startTime: bookingData.startTime,
      duration: bookingData.duration,
      status: 'pending',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Book a Session with {tutor.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={bookingData.subject}
              onChange={(e) => setBookingData({ ...bookingData, subject: e.target.value })}
            >
              {tutor.subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={bookingData.startTime}
              onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
            <input
              type="number"
              min="1"
              max="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={bookingData.duration}
              onChange={(e) => setBookingData({ ...bookingData, duration: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}