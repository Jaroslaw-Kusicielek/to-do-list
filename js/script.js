{
    let tasks = [];
    let hideDoneTasks;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.filter((task, index) => index !== taskIndex),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };

    const removeEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const toggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
              <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
                <button class="tasks__button tasks__button--done js-done">
                  ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                  ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                  🗑
                </button>
              </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        removeEvents();

        toggleDoneEvents();
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
        
            <button class="buttons__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>

        `;
    };

    const bindButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", () => {
                tasks = tasks.map((task) => ({
                    ...task,
                    done: true,
                }));
                render();
            });
        };

        const toggleHideDoneTasksButtons = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButtons) {
            toggleHideDoneTasksButtons.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        };
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}