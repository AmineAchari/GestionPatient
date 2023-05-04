const prisma = require('../prisma/prismaInstance');
const bcrypt = require('bcryptjs')


// create Doctor
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

    const Doc = await prisma.doctor.create({
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

    return res.status(200).json(Doc);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }

}


//GetAll
exports.getAll = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: true
      }
    });
    return res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}