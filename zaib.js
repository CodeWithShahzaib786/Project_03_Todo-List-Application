#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
//Print welcome message
console.log(chalk.magenta.bold("\n\t Welcome to CodeWithShahzaib - TodoList Application \n"));
// create function to add option  in todo list 
let index = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an option you want to do:",
                choices: ["Add task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choices === "Add task") {
            await addTask();
        }
        else if (option.choices === "Delete Task") {
            await deleteTask();
        }
        else if (option.choices === "Update Task") {
            await updateTask();
        }
        else if (option.choices === "View Todo-List") {
            await viewTask();
        }
        else if (option.choices === "Exit") {
            condition = false;
        }
    }
};
//Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Enter your new task:")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.green(` \n ${newTask.task}: task added successfully in Todo-list \n`));
};
//Function to view all todo-list tasks
let viewTask = async () => {
    console.log(chalk.blue(" \n Your Todo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(chalk.green(`${index + 1}: ${task} `));
    });
};
//Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow(" Enter the 'index no.' of the task you want to delete: "),
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.green(` \n ${deleteTask}: this task has been deleted successfully from your Todo-List \n`));
};
//Function to update a task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the 'index no' of the task you want to update :")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.yellow("Now enter new task name: "),
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.green(`\n Task at index no. ${update_task_index.index} updated successfully[for updated list Check option: "View Todo-List"] \n`));
};
index();
