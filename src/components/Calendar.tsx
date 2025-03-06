import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const API_KEY = 'YOUR_GOOGLE_CALENDAR_API_KEY';
const CALENDAR_ID = 'YOUR_GOOGLE_CALENDAR_ID';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: 'pesticide' | 'irrigation' | 'fertilizer' | 'other';
  description?: string;
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskType, setTaskType] = useState<Task['type']>('other');
  const [taskTitle, setTaskTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`);
        const data = await response.json();
        if (data.items) {
          const events = data.items.map((event: any) => ({
            id: event.id,
            title: event.summary,
            date: new Date(event.start.dateTime || event.start.date),
            completed: false,
            type: 'other',
          }));
          setTasks(events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = () => {
    if (!taskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      date: selectedDate,
      completed: false,
      type: taskType,
    };
    setTasks(prev => [...prev, newTask]);
    setIsModalOpen(false);
    setTaskTitle('');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setSelectedDate(subMonths(selectedDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">{format(selectedDate, 'MMMM yyyy')}</h2>
          <button onClick={() => setSelectedDate(addMonths(selectedDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day}>{day}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1 border-t border-l">
          {eachDayOfInterval({ start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 1 }), end: endOfMonth(selectedDate) }).map(day => (
            <div key={day.toISOString()} className={`p-4 border-r border-b text-sm cursor-pointer ${isSameDay(day, new Date()) ? 'bg-green-200 rounded-full' : ''}`} onClick={() => setSelectedDate(day)}>
              <div className="text-right text-gray-500">{format(day, 'd')}</div>
              {tasks.filter(task => isSameDay(task.date, day)).map(task => (
                <div key={task.id} className="mt-2 text-xs p-2 rounded bg-blue-100 text-blue-800 flex justify-between items-center">
                  {task.title}
                  <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Task
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add Task</h3>
            <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-2 border rounded mb-2" />
            <input type="date" value={format(selectedDate, 'yyyy-MM-dd')} onChange={(e) => setSelectedDate(new Date(e.target.value))} className="w-full p-2 border rounded mb-2" />
            <select value={taskType} onChange={(e) => setTaskType(e.target.value as Task['type'])} className="w-full p-2 border rounded mb-2">
              <option value="pesticide">Pesticide Calendar</option>
              <option value="irrigation">Irrigation Calendar</option>
              <option value="fertilizer">Fertilizer Calendar</option>
              <option value="other">Other</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
              <button onClick={addEvent} className="px-4 py-2 bg-green-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
