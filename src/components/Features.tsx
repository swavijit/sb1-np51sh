import { BookOpen, Calendar, CreditCard, MessageSquare, Star, Users } from 'lucide-react';

const features = [
  {
    name: 'Verified Tutors',
    description: 'All tutors are thoroughly vetted and verified for quality assurance.',
    icon: Users,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule with our easy-to-use calendar.',
    icon: Calendar,
  },
  {
    name: 'Instant Messaging',
    description: 'Connect with tutors instantly through our built-in messaging system.',
    icon: MessageSquare,
  },
  {
    name: 'Premium Features',
    description: 'Access advanced features like video calls and resource sharing.',
    icon: CreditCard,
  },
  {
    name: 'Subject Expertise',
    description: 'Find tutors specialized in your specific subject needs.',
    icon: BookOpen,
  },
  {
    name: 'Rating System',
    description: 'Make informed decisions with our transparent review system.',
    icon: Star,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools necessary for effective learning and teaching.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}