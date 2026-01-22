import Cards from './cards';
import AddTaskField from './add-task-field';
import AddButton from './add-button';

export function ChallengeComponent() {
  return (
    <main className="p-6">
      <Cards />
      <div className="flex gap-4 mt-6 max-w-[calc((100%-3rem)/3)]">
        <AddTaskField />
        <AddButton />
      </div>
    </main>
  );
}
