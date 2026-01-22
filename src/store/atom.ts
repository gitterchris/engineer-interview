import { atom } from 'jotai';

export const currentTaskAtom = atom('');

export const tasksAtom = atom<Task[]>([]);