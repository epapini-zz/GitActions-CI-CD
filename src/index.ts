import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  res.json(user);
});

app.post('/createManyUsers', async (req: Request, res: Response) => {
  const { userList } = req.body;

  const users = await prisma.user.createMany({
    data: userList,
  });

  res.json(users);
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.get('/byId/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const users = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  res.json(users);
});

app.put('/update', async (req: Request, res: Response) => {
  const { id, username } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: username,
    },
  });

  res.json(updateUser);
});

app.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(deleteUser);
});

app.listen(4444, () => console.log(`Server is running on PORT 4444`));
