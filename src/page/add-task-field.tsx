import { useAtom } from 'jotai';
import { currentTaskAtom } from '../store/atom';

const AddTaskField = () => {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  }

  return (
    <input
      type="text"
      value={currentTask}
      onChange={handleTaskChange}
      placeholder="Add Task"
      className="w-full h-14 px-4 text-lg border border-black focus:outline-none"
    />
  );
}

export default AddTaskField;
