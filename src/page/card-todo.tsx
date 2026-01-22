import { useAtomValue, useSetAtom } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { todoTasksAtom, tasksAtom } from '../store/atom';

const CardTodo = () => {
  const tasks = useAtomValue(todoTasksAtom);
  const setTasks = useSetAtom(tasksAtom);

  const handleForwardClick = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'IN_PROGRESS' } : task
      )
    );
  };

  return (
    <Card title="To Do">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton disabled />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton onClick={() => handleForwardClick(task.id)} />
        </Item>
      ))}
    </Card>
  );
};

export default CardTodo;