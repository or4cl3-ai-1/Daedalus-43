import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  CheckCircle2, Clock, AlertTriangle, TrendingUp, 
  Code2, Gauge, Target, Calendar, Activity 
} from 'lucide-react';
import { cn } from '../utils/cn';

const speedData = [
  { name: 'Mon', speed: 45, quality: 88 },
  { name: 'Tue', speed: 52, quality: 92 },
  { name: 'Wed', speed: 48, quality: 90 },
  { name: 'Thu', speed: 61, quality: 94 },
  { name: 'Fri', speed: 55, quality: 91 },
  { name: 'Sat', speed: 67, quality: 95 },
  { name: 'Sun', speed: 72, quality: 96 },
];

const taskDistribution = [
  { name: 'Architecture', value: 30 },
  { name: 'Implementation', value: 45 },
  { name: 'Testing', value: 15 },
  { name: 'Ethical Audit', value: 10 },
];

const COLORS = ['#00ff9d', '#00b8ff', '#ff00ff', '#ffb800'];

export const ProjectDashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 overflow-y-auto h-full">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Target className="text-daedalus-accent" />} label="Project Status" value="84%" subValue="On Track" />
        <StatCard icon={<Clock className="text-blue-400" />} label="Active Tasks" value="12" subValue="4 Critical" />
        <StatCard icon={<TrendingUp className="text-purple-400" />} label="Dev Velocity" value="+24%" subValue="vs Last Week" />
        <StatCard icon={<CheckCircle2 className="text-emerald-400" />} label="Code Quality" value="96.4" subValue="A+ Grade" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visualization 1: Development Velocity & Quality */}
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Gauge className="w-4 h-4 text-daedalus-accent" />
              Velocity vs Quality
            </h3>
            <div className="flex gap-4 text-[10px] font-mono uppercase">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-daedalus-accent rounded-full" /> Speed</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-full" /> Quality</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={speedData}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="speed" stroke="#00ff9d" fillOpacity={1} fill="url(#colorSpeed)" strokeWidth={2} />
                <Line type="monotone" dataKey="quality" stroke="#00b8ff" strokeWidth={2} dot={{ r: 4, fill: '#00b8ff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visualization 2: Task Distribution */}
        <div className="glass-panel p-6 space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <Code2 className="w-4 h-4 text-daedalus-accent" />
            Daedalus Resource Allocation
          </h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">100%</span>
              <span className="text-[10px] text-daedalus-muted uppercase font-mono">Utilized</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {taskDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-daedalus-muted">{item.name}</span>
                <span className="font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Milestones & Active Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Milestones */}
        <div className="glass-panel p-6 space-y-6 lg:col-span-1">
          <h3 className="font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-daedalus-accent" />
            Upcoming Milestones
          </h3>
          <div className="space-y-4">
            <MilestoneItem date="Mar 15" title="Alpha Release" status="On Track" />
            <MilestoneItem date="Mar 22" title="Security Audit" status="Pending" />
            <MilestoneItem date="Apr 05" title="Beta Launch" status="Upcoming" />
          </div>
        </div>

        {/* Active Tasks */}
        <div className="glass-panel p-6 space-y-6 lg:col-span-2">
          <h3 className="font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-daedalus-accent" />
            Daedalus Active Tasks
          </h3>
          <div className="space-y-3">
            <TaskItem title="Synthesizing Microservices Architecture" progress={75} priority="High" />
            <TaskItem title="Refactoring Authentication Logic" progress={40} priority="Medium" />
            <TaskItem title="Generating Unit Tests for Core Engine" progress={92} priority="Low" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue: string }) => (
  <div className="glass-panel p-6 space-y-2 hover:border-daedalus-accent/30 transition-all">
    <div className="flex items-center justify-between">
      <span className="text-xs font-mono text-daedalus-muted uppercase tracking-wider">{label}</span>
      {icon}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold tracking-tight">{value}</span>
      <span className="text-[10px] font-mono text-daedalus-muted">{subValue}</span>
    </div>
  </div>
);

const MilestoneItem = ({ date, title, status }: { date: string, title: string, status: string }) => (
  <div className="flex items-center gap-4 group">
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-mono text-daedalus-muted uppercase">{date.split(' ')[0]}</div>
      <div className="text-lg font-bold leading-none">{date.split(' ')[1]}</div>
    </div>
    <div className="h-8 w-px bg-daedalus-border" />
    <div className="flex-1">
      <div className="text-sm font-medium">{title}</div>
      <div className={cn(
        "text-[10px] font-mono uppercase",
        status === 'On Track' ? "text-daedalus-accent" : "text-daedalus-muted"
      )}>{status}</div>
    </div>
  </div>
);

const TaskItem = ({ title, progress, priority }: { title: string, progress: number, priority: 'High' | 'Medium' | 'Low' }) => (
  <div className="space-y-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{title}</span>
      <span className={cn(
        "text-[10px] font-mono px-2 py-0.5 rounded border",
        priority === 'High' ? "border-red-500/50 text-red-400 bg-red-500/10" :
        priority === 'Medium' ? "border-blue-500/50 text-blue-400 bg-blue-500/10" :
        "border-daedalus-muted/50 text-daedalus-muted bg-white/5"
      )}>{priority}</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-daedalus-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-daedalus-muted">{progress}%</span>
    </div>
  </div>
);
