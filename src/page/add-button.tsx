import { useAtom } from 'jotai';
import PlusButton from '../components/plus-button';
import { currentTaskAtom, tasksAtom } from '../store/atom';

const AddButton = () => {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
  const [tasks, setTasks] = useAtom(tasksAtom);

  const handleClick = () => {
    if (!currentTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: currentTask,
        status: 'TODO',
      },
    ]);

    setCurrentTask('');
  };

  return <PlusButton onClick={handleClick} />;
}

export default AddButton;
