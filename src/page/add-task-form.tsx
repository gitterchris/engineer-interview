import { useAtom, useSetAtom } from 'jotai';
import AddTaskField from './add-task-field';
import PlusButton from '../components/plus-button';
import { currentTaskAtom, tasksAtom } from '../store/atom';

const AddTaskForm = () => {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
  const setTasks = useSetAtom(tasksAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: currentTask,
        status: 'TODO',
      },
    ]);

    setCurrentTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-6 max-w-[calc((100%-3rem)/3)]">
      <AddTaskField />
      <PlusButton type="submit" />;
    </form>
  );
};

export default AddTaskForm;
