import CardTodo from './card-todo';
import CardInProgress from './card-in-progress';
import CardDone from './card-done';

const Cards = () => (
  <div className="grid grid-cols-3 gap-6">
    <CardTodo /> 
    <CardInProgress />
    <CardDone />
  </div>
)

export default Cards;
