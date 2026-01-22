import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Provider, createStore } from "jotai";
import { ChallengeComponent } from "./ChallengeComponent";

const renderComponent = () => {
  const store = createStore();
  return render(
    <Provider store={store}>
      <ChallengeComponent />
    </Provider>
  );
};

describe("ChallengeComponent", () => {
  it("renders three card columns", () => {
    renderComponent();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders add task form", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Add Task")).toBeInTheDocument();
  });

  it("adds a new task to To Do column", async () => {
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Add Task");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "New Task");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
    expect(input).toHaveValue("");
  });

  it("does not add empty task", async () => {
    renderComponent();
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.click(submitButton);

    await waitFor(() => {
      const items = screen.queryAllByRole("button", { name: /forward/i });
      expect(items).toHaveLength(0);
    });
  });

  it("moves task from To Do to In Progress", async () => {
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Add Task");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Move me");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Move me")).toBeInTheDocument();
    });

    const forwardButton = screen.getByRole("button", { name: /forward/i });
    await user.click(forwardButton);

    await waitFor(() => {
      const backButtons = screen.getAllByRole("button", { name: /back/i });
      const enabledBackButton = backButtons.find(
        (btn) => !btn.hasAttribute("disabled")
      );
      expect(enabledBackButton).toBeInTheDocument();
    });
  });

  it("moves task from In Progress to Done", async () => {
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Add Task");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Complete me");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Complete me")).toBeInTheDocument();
    });

    let forwardButton = screen.getByRole("button", { name: /forward/i });
    await user.click(forwardButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /forward/i })).toBeInTheDocument();
    });

    forwardButton = screen.getByRole("button", { name: /forward/i });
    await user.click(forwardButton);

    await waitFor(() => {
      const forwardButtons = screen.getAllByRole("button", { name: /forward/i });
      const disabledForwardButton = forwardButtons.find((btn) =>
        btn.hasAttribute("disabled")
      );
      expect(disabledForwardButton).toBeInTheDocument();
    });
  });

  it("moves task back from Done to In Progress", async () => {
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Add Task");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(input, "Move back");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Move back")).toBeInTheDocument();
    });

    let forwardButton = screen.getByRole("button", { name: /forward/i });
    await user.click(forwardButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /forward/i })).toBeInTheDocument();
    });

    forwardButton = screen.getByRole("button", { name: /forward/i });
    await user.click(forwardButton);

    await waitFor(() => {
      const backButtons = screen.getAllByRole("button", { name: /back/i });
      const enabledBackButton = backButtons.find(
        (btn) => !btn.hasAttribute("disabled")
      );
      expect(enabledBackButton).toBeInTheDocument();
    });

    const backButtons = screen.getAllByRole("button", { name: /back/i });
    const enabledBackButton = backButtons.find(
      (btn) => !btn.hasAttribute("disabled")
    );
    await user.click(enabledBackButton!);

    await waitFor(() => {
      const forwardButtons = screen.getAllByRole("button", { name: /forward/i });
      const enabledForwardButton = forwardButtons.find(
        (btn) => !btn.hasAttribute("disabled")
      );
      expect(enabledForwardButton).toBeInTheDocument();
    });
  });

  describe("button states", () => {
    it("disables back button and enables forward button when task is in To Do column", async () => {
      renderComponent();
      const user = userEvent.setup();
      const input = screen.getByPlaceholderText("Add Task");
      const submitButton = screen.getByRole("button", { name: /add/i });

      await user.type(input, "Test task");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Test task")).toBeInTheDocument();
      });

      const taskItem = screen.getByText("Test task").closest("div");
      const backButton = within(taskItem!).getByRole("button", { name: /back/i });
      const forwardButton = within(taskItem!).getByRole("button", { name: /forward/i });

      expect(backButton).toBeDisabled();
      expect(forwardButton).not.toBeDisabled();
    });

    it("enables both buttons when task is in In Progress column", async () => {
      renderComponent();
      const user = userEvent.setup();
      const input = screen.getByPlaceholderText("Add Task");
      const submitButton = screen.getByRole("button", { name: /add/i });

      await user.type(input, "Test task");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Test task")).toBeInTheDocument();
      });

      // Move to In Progress
      const forwardButton = screen.getByRole("button", { name: /forward/i });
      await user.click(forwardButton);

      await waitFor(() => {
        const taskItem = screen.getByText("Test task").closest("div");
        const backBtn = within(taskItem!).getByRole("button", { name: /back/i });
        const fwdBtn = within(taskItem!).getByRole("button", { name: /forward/i });

        expect(backBtn).not.toBeDisabled();
        expect(fwdBtn).not.toBeDisabled();
      });
    });

    it("enables back button and disables forward button when task is in Done column", async () => {
      renderComponent();
      const user = userEvent.setup();
      const input = screen.getByPlaceholderText("Add Task");
      const submitButton = screen.getByRole("button", { name: /add/i });

      await user.type(input, "Test task");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Test task")).toBeInTheDocument();
      });

      // Move to In Progress
      let forwardButton = screen.getByRole("button", { name: /forward/i });
      await user.click(forwardButton);

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /forward/i })).toBeInTheDocument();
      });

      // Move to Done
      forwardButton = screen.getByRole("button", { name: /forward/i });
      await user.click(forwardButton);

      await waitFor(() => {
        const taskItem = screen.getByText("Test task").closest("div");
        const backBtn = within(taskItem!).getByRole("button", { name: /back/i });
        const fwdBtn = within(taskItem!).getByRole("button", { name: /forward/i });

        expect(backBtn).not.toBeDisabled();
        expect(fwdBtn).toBeDisabled();
      });
    });
  });
});
