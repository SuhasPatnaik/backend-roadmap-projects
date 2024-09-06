// Common core modules
const fs = require("fs");
const path = require("path");

const command = process.argv.slice(2);

console.log(command);

const pathToDir = path.join(__dirname, "data");
const pathToFile = path.join(__dirname, "data", "tasks.json");

function addToList(description) {
  // Check if "data" directory doesn't exist -> create it
  if (!fs.existsSync(pathToDir)) fs.mkdirSync(pathToDir);

  // Check if "tasks.json" file doesn't exist or is empty -> create it with an empty array
  if (!fs.existsSync(pathToFile) || !fs.readFileSync(pathToFile, "utf-8"))
    fs.writeFileSync(pathToFile, JSON.stringify([]));

  const tasksFileContent = fs.readFileSync(pathToFile, "utf-8");

  const taskList = JSON.parse(tasksFileContent);

  // Find the last task's ID and increment by 1
  const lastTask = taskList[taskList.length - 1];
  const newId = lastTask ? lastTask.id + 1 : 1;

  const newTask = {
    id: newId,
    description: process.argv.slice(3),
    status: "todo",
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
  };
  taskList.push(newTask);
  fs.writeFileSync(pathToFile, JSON.stringify(taskList));
}

if (command[0] === "add") addToList();
