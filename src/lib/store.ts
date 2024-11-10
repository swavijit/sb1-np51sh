import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SearchFilters, Message, Booking } from '../types';

interface AppState {
  currentUser: User | null;
  users: User[];
  messages: Message[];
  bookings: Booking[];
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  searchTutors: (filters: SearchFilters) => User[];
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  getMessages: (userId: string) => Message[];
  createBooking: (booking: Omit<Booking, 'id' | 'timestamp'>) => void;
  updateBooking: (bookingId: string, status: Booking['status']) => void;
  getUserBookings: (userId: string) => Booking[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          type: 'teacher',
          subjects: ['Mathematics', 'Physics'],
          location: 'New York',
          rating: 4.8,
          isPremium: true,
          hourlyRate: 50,
          bio: 'Experienced Math and Physics tutor with 10+ years of teaching',
          availability: ['Monday', 'Wednesday', 'Friday'],
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          type: 'teacher',
          subjects: ['English', 'Literature'],
          location: 'Boston',
          rating: 4.9,
          isPremium: false,
          hourlyRate: 45,
          bio: 'Passionate about helping students master English',
          availability: ['Tuesday', 'Thursday', 'Saturday'],
          profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ],
      messages: [],
      bookings: [],
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((user) => 
          user.id === updatedUser.id ? updatedUser : user
        ),
      })),
      searchTutors: (filters) => {
        const { users } = get();
        return users.filter((user) => {
          if (user.type !== 'teacher') return false;
          if (filters.subject && !user.subjects.includes(filters.subject)) return false;
          if (filters.location && !user.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
          if (filters.maxPrice && (user.hourlyRate || 0) > filters.maxPrice) return false;
          if (filters.rating && (user.rating || 0) < filters.rating) return false;
          return true;
        });
      },
      sendMessage: (senderId, receiverId, content) => set((state) => ({
        messages: [...state.messages, {
          id: Date.now().toString(),
          senderId,
          receiverId,
          content,
          timestamp: Date.now(),
          read: false,
        }],
      })),
      getMessages: (userId) => {
        const { messages } = get();
        return messages.filter(
          (msg) => msg.senderId === userId || msg.receiverId === userId
        );
      },
      createBooking: (booking) => set((state) => ({
        bookings: [...state.bookings, {
          ...booking,
          id: Date.now().toString(),
          timestamp: Date.now(),
        }],
      })),
      updateBooking: (bookingId, status) => set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        ),
      })),
      getUserBookings: (userId) => {
        const { bookings } = get();
        return bookings.filter(
          (booking) => booking.studentId === userId || booking.teacherId === userId
        );
      },
    }),
    {
      name: 'tutor-match-storage',
    }
  )
);