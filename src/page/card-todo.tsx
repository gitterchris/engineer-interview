import { useAtomValue } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { todoTasksAtom } from '../store/atom';

const CardTodo = () => {
  const tasks = useAtomValue(todoTasksAtom);

  return (
    <Card title="To Do">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton disabled />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton />
        </Item>
      ))}
    </Card>
  );
};

export default CardTodo;