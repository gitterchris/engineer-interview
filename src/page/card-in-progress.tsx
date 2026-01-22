import { useAtomValue } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { inProgressTasksAtom } from '../store/atom';

const CardInProgress = () => {
  const tasks = useAtomValue(inProgressTasksAtom);

  return (
    <Card title="In Progress">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton />
        </Item>
      ))}
    </Card>
  );
};

export default CardInProgress;
