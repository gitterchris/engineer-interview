import { atom } from 'jotai';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export const currentTaskAtom = atom('');

export const tasksAtom = atom<Task[]>([]);

export const todoTasksAtom = atom((get) =>
  get(tasksAtom).filter((task) => task.status === 'TODO')
);

export const inProgressTasksAtom = atom((get) =>
  get(tasksAtom).filter((task) => task.status === 'IN_PROGRESS')
);

export const doneTasksAtom = atom((get) =>
  get(tasksAtom).filter((task) => task.status === 'DONE')
);