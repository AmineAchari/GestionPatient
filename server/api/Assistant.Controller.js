const prisma = require('../prisma/prismaInstance');
const bcrypt = require('bcryptjs')


// create assistant
exports.create = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    // GENERATE bcrypt
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const NewUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
    })

    const Assist = await prisma.assistant.create({
      data: {
        user: {
          connect: {
            id: NewUser.id
          },
        },
      },
      include: {
        user: true
      },
    })

    return res.status(200).json(Assist);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
}



//GetAll
exports.getAll = async (req, res) => {
  try {
    const assistants = await prisma.assistant.findMany({
      include: {
        user: true
      }
    });
    return res.status(200).json(assistants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}