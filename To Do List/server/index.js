const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const Personal = require('./models/personal');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/todos', async (req, res) => {
  try {
    const todos = await Personal.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Personal({ text }); // Change Todo to Personal
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Error creating todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const todo = await Personal.findByIdAndUpdate(id, { text }, { new: true }); // Change Todo to Personal
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Error updating todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Personal.findByIdAndDelete(id); // Change Todo to Personal
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
