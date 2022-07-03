const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = ('jsonwebtoken');

class UserService {
	async register(student_id, password) {
    const isUserExist = await User.findOne({where: {student_id}});

    if(isUserExist) {
      return alreadyExist;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({student_id, password: hashPassword});
    return successfullyAdded;
  }
}

const alreadyExist = {
  meta: {
    message_developer: "User Already Exist",
    status_code: 409
  }, 
  response: null
}

const successfullyAdded = {
  meta: {
    message_developer: "Successfully added account",
		status_code: 400
  },
  response: null
}

module.exports = new UserService();