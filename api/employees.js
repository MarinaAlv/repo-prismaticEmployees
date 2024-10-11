const express = require('express');
const router = express.Router();
module.exports = router;

const prisma = require('../prisma');

router.get('/', async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employee);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;

  try {
    const employees = await prisma.employee.findUnique({where: {id: +id}});
    if (employee) {
      res.json(employee);
    } else {
      next({status: 404, message: `Employee with ${id} does not exist.`});
    }
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const {id} = re.params;
  const {name} = req.body;

  if (!name) {
    return next({
      status: 400,
      message: 'A new name must be provided.',
    });
  }

  try {
    const employee = await prisma.employee.findUnique({where: {id: +id}});
    if (!employee) {
      return next({
        status: 404,
        message: `Employee with id ${id} does not exist.`,
      });
    }
    const updateEmployee = await prisma.employee.update({
      where: {id: +id},
      data: {name},
    });
    res.json(updateEmployee);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const {name} = req.body;
  if (!name) {
    return next({
      status: 400,
      message: 'Name must be provided for a new book.',
    });
  }
  try {
    const book = await prisma.employee.create({data: {name}});
    res.status(201).json(book);
  } catch (e) {
    next(e);
  }
});

router.delete('/id', async (req, res, next) => {
  const {id} = req.params;

  try {
    const employee = await prisma.employee.findUnique({where: {id: +id}});
    if (!employee) {
      return next({
        status: 404,
        message: `Employee with id ${id} does not exist.`,
      });
    }
    await prisma.employee.delete({where: {id: +id}});
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
