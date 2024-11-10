import { User } from '../types';
import { Star, MessageSquare, Calendar } from 'lucide-react';
import { useStore } from '../lib/store';
import { useState } from 'react';
import BookingModal from './BookingModal';
import MessageModal from './MessageModal';

interface TutorListProps {
  tutors: User[];
}

export default function TutorList({ tutors }: TutorListProps) {
  const { currentUser } = useStore();
  const [selectedTutor, setSelectedTutor] = useState<User | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleBooking = (tutor: User) => {
    if (!currentUser) {
      alert('Please sign in to book a session');
      return;
    }
    setSelectedTutor(tutor);
    setIsBookingOpen(true);
  };

  const handleMessage = (tutor: User) => {
    if (!currentUser) {
      alert('Please sign in to send a message');
      return;
    }
    setSelectedTutor(tutor);
    setIsMessageOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative pb-48">
              <img
                className="absolute h-full w-full object-cover"
                src={tutor.profileImage}
                alt={tutor.name}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{tutor.name}</h3>
                {tutor.isPremium && (
                  <span className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-gray-600">{tutor.rating}</span>
              </div>
              <p className="mt-2 text-gray-600">{tutor.subjects.join(', ')}</p>
              <p className="text-gray-500">{tutor.location}</p>
              {tutor.hourlyRate && (
                <p className="mt-2 text-lg font-semibold text-indigo-600">
                  ${tutor.hourlyRate}/hour
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleBooking(tutor)}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book
                </button>
                <button
                  onClick={() => handleMessage(tutor)}
                  className="flex-1 bg-white text-indigo-600 py-2 px-4 rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTutor && (
        <>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            tutor={selectedTutor}
          />
          <MessageModal
            isOpen={isMessageOpen}
            onClose={() => setIsMessageOpen(false)}
            tutor={selectedTutor}
          />
        </>
      )}
    </div>
  );
}