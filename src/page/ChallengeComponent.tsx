import Cards from './cards';
import AddTaskForm from './add-task-form';

export function ChallengeComponent() {
  return (
    <main className="p-6">
      <Cards />
      <AddTaskForm />
    </main>
  );
}
