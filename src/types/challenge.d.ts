type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
