import { useAtomValue } from 'jotai';
import Card from '../components/card';
import Item from '../components/item';
import BackButton from '../components/back-button';
import ForwardButton from '../components/forward-button';
import { doneTasksAtom } from '../store/atom';

const CardDone = () => {
  const tasks = useAtomValue(doneTasksAtom);

  return (
    <Card title="Done">
      {tasks.map((task) => (
        <Item key={task.id}>
          <BackButton />
          <span className="flex-1 text-center text-lg">{task.title}</span>
          <ForwardButton disabled />
        </Item>
      ))}
    </Card>
  );
};

export default CardDone;
