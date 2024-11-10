export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'teacher';
  subjects: string[];
  location: string;
  rating?: number;
  isPremium: boolean;
  hourlyRate?: number;
  bio?: string;
  availability?: string[];
  profileImage?: string;
  reviews?: Review[];
  bookings?: Booking[];
}

export interface SearchFilters {
  subject?: string;
  location?: string;
  maxPrice?: number;
  rating?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  date: string;
  startTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  timestamp: number;
}