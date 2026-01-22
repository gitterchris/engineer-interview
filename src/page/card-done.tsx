import { useAtomValue, useSetAtom } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { doneTasksAtom, tasksAtom } from '../store/atom';

const CardDone = () => {
  const tasks = useAtomValue(doneTasksAtom);
  const setTasks = useSetAtom(tasksAtom);

  const handleBackClick = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'IN_PROGRESS' } : task
      )
    );
  };

  return (
    <Card title="Done">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton onClick={() => handleBackClick(task.id)} />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton disabled />
        </Item>
      ))}
    </Card>
  );
};

export default CardDone;
