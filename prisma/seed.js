const prisma = require('../prisma');
const seed = async () => {
  //TODO: 10 employees w placeholder titles
  const employees = [];
  for (let i = 0; i < 10; i++) {
    employees.push({name: `Employee ${i}`});
  }
  await prisma.employee.createMany({data: employees});
};
//done from solution, I have a question about it.
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    ProcessingInstruction.exit(1);
  });
