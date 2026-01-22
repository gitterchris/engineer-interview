import { useAtomValue, useSetAtom } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { inProgressTasksAtom, tasksAtom } from '../store/atom';

const CardInProgress = () => {
  const tasks = useAtomValue(inProgressTasksAtom);
  const setTasks = useSetAtom(tasksAtom);

  const handleBackClick = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'TODO' } : task
      )
    );
  };

  const handleForwardClick = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'DONE' } : task
      )
    );
  };

  return (
    <Card title="In Progress">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton onClick={() => handleBackClick(task.id)} />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton onClick={() => handleForwardClick(task.id)} />
        </Item>
      ))}
    </Card>
  );
};

export default CardInProgress;
