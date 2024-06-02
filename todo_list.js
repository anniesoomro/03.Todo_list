#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todo_list = [];
let while_condition = true;
while (while_condition === true) {
    //  ----------------------- options -------------------------
    let option = await inquirer.prompt([{
            type: 'list',
            name: "user_option",
            message: '\nselect an options\n',
            choices: ["Add", "Edit", "Remove"]
        }]);
    //  ----------------------- Add -------------------------
    if (option.user_option === "Add") {
        let ans = await inquirer.prompt([{
                type: 'input',
                name: 'usr_ans',
                message: '\nwrite something to add in the task list.\n'
            }]);
        if (ans.usr_ans !== '') {
            todo_list.push(ans.usr_ans);
            console.log(todo_list);
        }
        else {
            console.log(chalk.bgBlackBright.italic('please write something to add in the todo list'));
        }
    }
    //  ----------------------- Remove -------------------------
    else if (option.user_option === "Remove") {
        let removeChoice = await inquirer.prompt([{
                type: 'list',
                name: 'remove_item',
                message: '\nselect item to remove\n',
                choices: todo_list
            }]);
        let index_to_remove = todo_list.indexOf(removeChoice.remove_item);
        if (index_to_remove >= 0) {
            todo_list.splice(index_to_remove, 1);
            console.log(chalk.bgCyanBright.bold.italic('You removed : ', removeChoice.remove_item));
            console.log(todo_list);
        }
    }
    //  ----------------------- Confirmation -------------------------
    let user_ans = await inquirer.prompt([{
            type: 'confirm',
            name: 'selection',
            message: '\nDo you want to continue?\n',
            default: true
        }]);
    if (user_ans.selection === false) {
        while_condition = false;
    }
    //  ----------------------- Edit -------------------------
    else if (option.user_option === "Edit") {
        let edit_value = await inquirer.prompt([{
                type: 'list',
                name: 'edit_item',
                message: '\nEdit item in todo list\n',
                choices: todo_list
            }]);
        let edition = await inquirer.prompt([{
                type: 'list',
                name: 'edit text',
                message: '\nwhich item you add instead of these item?\n',
                choices: todo_list
            }]);
        let index_to_edit = todo_list.indexOf(edit_value.edit_item);
        if (index_to_edit >= 0) {
            todo_list.splice(index_to_edit, 1, edition.edit_text);
            console.log(todo_list);
        }
    }
}
console.log(`Thank you for using to do list`);
