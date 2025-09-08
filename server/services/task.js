const Task = require("../models/task");

//addTask
const addTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const { user } = req;
        if (!title || !description || !priority || !status) {
            return res.status(404).json({ error: "All fileds Required" });
        }

        const checkTasks = await Task.findOne({ title });
        if (checkTasks) {
            return res.status(400).json({ error: "Task already Added !!!" })
        } else {
            const newTask = new Task({ title, description, priority, status });
            await newTask.save();
            user.tasks.push(newTask._id);
            await user.save();
            return res.status(200).json({ success: " Task Added" });
        }
    } catch (error) {
        return res.status(404).json({ error: "Internal Server Error" });
    }
};

//editTask
const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status } = req.body;
        //const { user } = req.user;
        if (!title || !description) {
            return res.status(404).json({ error: "All fileds Required" });
        }

        await task.findByIdAndUpdate(id, { title, description, priority, status })
        return res.status(200).json({ success: " Task Updated" });

    } catch (error) {
        return res.status(404).json({ error: "Internal Server Error" });
    }
};

//getTask
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDetails = await task.findById(id);
        return res.status(200).json({ success: " Task Updated" });

    } catch (error) {
        return res.status(404).json({ error: "Internal Server Error" });
    }
};

//deleteTask
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await task.findByIdAndDelete(id);
        return res.status(200).json({ success: "Task Deleted" });
    } catch (error) {
        return res.status(404).json({ error: "Internal Server Error" });
    }
};


module.exports = { addTask, editTask, getTask, deleteTask };



