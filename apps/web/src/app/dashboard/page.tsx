import { Hand, Paintbrush, Rocket, MousePointerClick, CircleDollarSign, HandCoins, Newspaper, Sprout, CheckCircle2, Circle } from 'lucide-react';

const tasks = [
  {
    title: 'Welcome aboard',
    description: 'Make a Flowmart account.',
    icon: Hand,
    completed: true,
  },
  {
    title: 'Make an impression',
    description: 'Customize your profile.',
    icon: Paintbrush,
    completed: true,
  },
  {
    title: 'Showtime',
    description: 'Create your first product.',
    icon: Rocket,
    completed: false,
  },
  {
    title: 'Build your tribe',
    description: 'Get your first follower.',
    icon: MousePointerClick,
    completed: false,
  },
  {
    title: 'Cha-ching',
    description: 'Make your first sale.',
    icon: CircleDollarSign,
    completed: false,
  },
  {
    title: 'Money inbound',
    description: 'Get your first pay out.',
    icon: HandCoins,
    completed: false,
  },
  {
    title: 'Making waves',
    description: 'Send out your first email blast.',
    icon: Newspaper,
    completed: false,
  },
  {
    title: 'Smart move',
    description: 'Sign up for Flowmart Pro.',
    icon: Sprout,
    completed: false,
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Getting started</h2>
          <button className="text-sm text-zinc-400 hover:text-white transition-colors underline decoration-zinc-600 underline-offset-4">
            Show less
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">
          {tasks.map((task, i) => {
            const Icon = task.icon;
            return (
              <div 
                key={i} 
                className="bg-black p-8 flex flex-col items-center text-center relative group hover:bg-[#050505] transition-colors cursor-pointer"
              >
                <div className="absolute top-4 right-4">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#C8F04D]" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                  )}
                </div>
                <Icon className="w-10 h-10 mb-4 text-white" strokeWidth={1.5} />
                <h3 className="font-medium text-white mb-1">{task.title}</h3>
                <p className="text-sm text-zinc-400">{task.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-[#C8F04D] overflow-hidden bg-[#C8F04D] h-[300px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="z-10 text-center text-black p-8">
          <h2 className="text-4xl font-extrabold tracking-tighter mb-4">You're on your way!</h2>
          <p className="text-lg font-medium opacity-80">Check back here as you complete more milestones.</p>
        </div>
      </div>
    </div>
  );
}
