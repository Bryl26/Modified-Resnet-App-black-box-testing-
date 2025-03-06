import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Check, Clock, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: 'pesticide' | 'irrigation' | 'fertilizer' | 'other';
  description?: string;
  reminder?: boolean;
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    type: 'other',
    reminder: false
  });
  const { t } = useTranslation();

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = () => {
    if (newTask.title && newTask.date) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        date: new Date(newTask.date),
        completed: false,
        type: newTask.type as 'pesticide' | 'irrigation' | 'fertilizer' | 'other',
        description: newTask.description,
        reminder: newTask.reminder
      };
      setTasks([...tasks, task]);
      setShowAddTask(false);
      setNewTask({ type: 'other', reminder: false });
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'pesticide': return 'bg-red-100 text-red-800';
      case 'irrigation': return 'bg-blue-100 text-blue-800';
      case 'fertilizer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSelectedDate(subMonths(selectedDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <button onClick={() => setSelectedDate(addMonths(selectedDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t('Add New Task')}</span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {t(`${day.toLowerCase()}`)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map(day => {
            const dayTasks = tasks.filter(task => isSameDay(task.date, day));
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] p-2 border rounded-lg ${
                  isSameMonth(day, selectedDate)
                    ? 'bg-white'
                    : 'bg-gray-50 text-gray-400'
                } ${dayTasks.length > 0 ? 'border-green-200' : 'border-gray-200'}`}
              >
                <div className="text-right text-sm">{format(day, 'd')}</div>
                <div className="mt-1 space-y-1">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`text-xs p-1 rounded ${getTaskTypeColor(task.type)} ${
                        task.completed ? 'opacity-50' : ''
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">{t('Task')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calendar.taskTitle')}
                  </label>
                  <input
                    type="text"
                    value={newTask.title || ''}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calendar.taskDate')}
                  </label>
                  <input
                    type="date"
                    value={newTask.date ? format(new Date(newTask.date), 'yyyy-MM-dd') : ''}
                    onChange={(e) => setNewTask({ ...newTask, date: new Date(e.target.value) })}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calendar.taskType')}
                  </label>
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value as Task['type'] })}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="pesticide">{t('Pesticide Calendar')}</option>
                    <option value="irrigation">{t('Irrigation Calendar')}</option>
                    <option value="fertilizer">{t('Fertilizer Calendar')}</option>
                    <option value="other">{t('calendar.types.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('calendar.taskDescription')}
                  </label>
                  <textarea
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full border rounded-md p-2"
                    rows={3}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newTask.reminder || false}
                    onChange={(e) => setNewTask({ ...newTask, reminder: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    {t('calendar.setReminder')}
                  </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    {t('calendar.cancel')}
                  </button>
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {t('calendar.add')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-4">{t('Tasks')}</h3>
          <div className="space-y-2">
            {tasks
              .filter(task => isSameDay(task.date, new Date()))
              .map(task => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {task.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{format(task.date, 'h:mm a')}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;