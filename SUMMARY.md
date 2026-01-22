# Project Summary

## Overview

This document summarizes the development work completed on the Every.io Todo List challenge - a Trello-style kanban board with three columns (To Do, In Progress, Done).

---

## Tools & Libraries Added

| Tool | Purpose |
|------|---------|
| **Storybook** | Component development and documentation |
| **Jotai** | Lightweight state management |
| **tailwind-merge** | Utility for merging Tailwind CSS classes |
| **react-scan** | Performance monitoring (devDependency) |

---

## Architecture Highlights

### Propless Components: Graph over Tree

A key architectural decision was replacing the traditional **top-down tree structure** (parent → child prop drilling) with a **graph-based approach** where components connect directly to shared state.

```
Traditional Tree (Prop Drilling):       Graph-Based (Atoms):

      App                                    ┌─────────────┐
       │                                     │   Atoms     │
       ▼                                     │ (shared     │
    Parent                                   │   state)    │
    /    \                                   └──────┬──────┘
   ▼      ▼                                    ┌────┼────┐
ChildA  ChildB                                 ▼    ▼    ▼
   │                                       CompA CompB CompC
   ▼                                       (each connects directly)
GrandChild
(props passed through every level)
```

Instead of data flowing down from parent to children, **each component independently subscribes to exactly the atoms it needs**. Components become nodes in a graph, connected to shared state rather than to each other.

**Benefits:**
- Eliminates prop drilling entirely
- Components are self-contained and independently testable
- Reduces re-renders (components only subscribe to the atoms they need)
- Cleaner component interfaces - no "pass-through" props
- Easier refactoring - moving components doesn't break prop chains

**Examples:**

```tsx
// AddTaskField - no props, connects directly to currentTaskAtom
const AddTaskField = () => {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
  return <input value={currentTask} onChange={...} />;
};

// CardTodo - no props, reads from todoTasksAtom
const CardTodo = () => {
  const tasks = useAtomValue(todoTasksAtom);
  return <Card title="To Do">...</Card>;
};
```

**Propless page components:**
- `AddTaskField` - Input field bound to `currentTaskAtom`
- `AddTaskForm` - Form wrapper using `useSetAtom` (write-only to prevent unnecessary re-renders)
- `AddButton` - Submit button (no state, just renders `PlusButton` with `type="submit"`)
- `CardTodo` - Displays TODO tasks from `todoTasksAtom`
- `CardInProgress` - Displays IN_PROGRESS tasks from `inProgressTasksAtom`
- `CardDone` - Displays DONE tasks from `doneTasksAtom`

### Reusable UI Components (with props)

Low-level UI components remain prop-driven for reusability:

- `BackButton` - `disabled`, `onClick`
- `ForwardButton` - `disabled`, `onClick`
- `PlusButton` - `onClick`, `type`
- `Card` - `title`, `children`
- `Item` - `children`

---

## Commits

| Commit | Description |
|--------|-------------|
| `698fd34` | Add tests for ChallengeComponent |
| `74130f2` | Wrap input and plus button in a form |
| `132b787` | Add event handlers for forward and back buttons |
| `8234dc5` | Add cards and task items |
| `ebaf253` | Fix layout and add cards |
| `8d04bfd` | Add AddButton component |
| `08aa26a` | Add react-scan for performance monitoring |
| `fa293cc` | Add AddTaskField component |
| `c519bed` | Add Jotai for state management |
| `3bc3447` | Restructure main components |
| `2629337` | Add Item component |
| `136247b` | Add Card component |
| `f1e84d3` | Add PlusButton component |
| `0d4267b` | Add ForwardButton component |
| `6483abe` | Add BackButton component |
| `3b01f23` | Setup Storybook |

---

## State Management

**Atoms (`src/store/atom.ts`):**

```tsx
// Primitive atoms
currentTaskAtom    // Current input value
tasksAtom          // All tasks array

// Derived atoms (read-only, auto-update when tasksAtom changes)
todoTasksAtom      // Tasks with status 'TODO'
inProgressTasksAtom // Tasks with status 'IN_PROGRESS'
doneTasksAtom      // Tasks with status 'DONE'
```

---

## Efficient Implementation

A major focus was **minimizing unnecessary re-renders** through careful atom subscription management:

### 1. Form does not re-render when clicking forward/back buttons

The `AddTaskForm` component uses `useSetAtom` (write-only) instead of `useAtom` for `tasksAtom`:

```tsx
const AddTaskForm = () => {
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
  const setTasks = useSetAtom(tasksAtom); // ✅ Write-only, no subscription

  // Component only re-renders when currentTask changes,
  // NOT when tasks are moved between columns
};
```

### 2. Cards do not re-render when typing in the input box

Each card component subscribes only to its **derived atom**, not the input:

```tsx
const CardTodo = () => {
  const tasks = useAtomValue(todoTasksAtom); // ✅ Only subscribes to TODO tasks
  // Does NOT subscribe to currentTaskAtom
};
```

**Subscription isolation:**

| Component | Subscribes To | Does NOT Subscribe To |
|-----------|--------------|----------------------|
| `AddTaskField` | `currentTaskAtom` | `tasksAtom` |
| `AddTaskForm` | `currentTaskAtom` | `tasksAtom` (write-only) |
| `CardTodo` | `todoTasksAtom` | `currentTaskAtom`, other task atoms |
| `CardInProgress` | `inProgressTasksAtom` | `currentTaskAtom`, other task atoms |
| `CardDone` | `doneTasksAtom` | `currentTaskAtom`, other task atoms |

This architecture ensures **surgical re-renders** - each component only updates when its specific data changes.

---

## Testing

- **10 tests** covering rendering, task creation, task movement, and button states
- Uses Jotai `Provider` with `createStore()` for test isolation
- Suppresses false-positive act() warnings from Jotai's async updates
