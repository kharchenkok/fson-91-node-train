import express from 'express';
import { v4 } from 'uuid';
import cors from 'cors';
import { promises as fs } from 'fs';

const app = express();

// MIDDLEWARES====================================
app.use(express.json());
app.use(cors());
// global custom middleware
app.use((req, res, next) => {
  console.log('Hello from middleware');
  req.time = new Date().toLocaleString('uk-UA');
  next();
});

app.use('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length < 10) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }
    const usersDB = await fs.readFile('data.json');
    const users = JSON.parse(usersDB);
    req.users = users;
    req.id = id;
    next();
  } catch (error) {
    console.log(error);
  }
});

// CONTROLLERS====================================
app.get('/ping', (req, res) => {
  // res.send('<p>Hello from server!!!</p>');
  // res.sendStatus(201);
  // console.log(res);
  // res.status(200).json({ msg: 'Hello from json!!!' });
  res.status(200).json({
    msg: 'pong!!!',
  });
});

/**
 * HTTP methods ================
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST         /users            - user creation
 * GET          /users            - get users list
 * GET          /users/<userID>   - get one user
 * PATCH(PUT)   /users/<userID>   - update one user
 * DELETE       /users/<userID>   - delete one user
 */

app.post('/users', async (req, res) => {
  try {
    const { name, year } = req.body;
    // TODO: validate data!!!!!!!!!!!!!!!!!!
    const newUser = {
      id: v4(),
      name,
      year
    };
    // Save user to DB
    const usersDB = await fs.readFile('data.json');
    const users = JSON.parse(usersDB);
    users.push(newUser);
    await fs.writeFile('data.json', JSON.stringify(users));
    res.status(201).json({ msg: 'User created', user: newUser });
  } catch (error) {
    console.log(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const usersDB = await fs.readFile('data.json');
    const users = JSON.parse(usersDB);
    res.status(200).json({ msg: 'Users list', users, time: req.time });
  } catch (error) {
    console.log(error);
  }
});

app.get('/users/:id', (req, res) => {
  const { id, users } = req;
  // const { id } = req.params;
  // const usersDB = await fs.readFile('data.json');
  // const users = JSON.parse(usersDB);
  const user = users.find((userItem) => userItem.id === id);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json({ msg: 'User', user });
});

app.patch('/users/:id', async (req, res) => {
  try {
    const { id, users } = req;
    // const { id } = req.params;
    // const usersDB = await fs.readFile('data.json');
    // const users = JSON.parse(usersDB);
    const userIndex = users.findIndex((userItem) => userItem.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Заборона зміни id через тіло запиту
    if (req.body.id && req.body.id !== id) {
      return res.status(400).json({ msg: 'Changing user ID is not allowed' });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    await fs.writeFile('data.json', JSON.stringify(users, null, 2));

    res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id, users } = req;
    // const { id } = req.params;
    // const usersDB = await fs.readFile('data.json');
    // let users = JSON.parse(usersDB);
    const userIndex = users.findIndex((userItem) => userItem.id === id);
    const userDeleted = users[userIndex];
    if (userIndex === -1) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const updateUserList = users.filter((userItem) => userItem.id !== id);

    await fs.writeFile('data.json', JSON.stringify(updateUserList, null, 2));

    res.status(200).json({ msg: 'User deleted successfully', userDeleted });
  } catch (error) {
    console.log(error);
  }
});

// server init====================================
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
