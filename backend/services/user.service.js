const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = ('jsonwebtoken');

class UserService {
	async register(student_id, password) {
    const isUserExist = await User.findOne({where: {student_id}});

    if(isUserExist) {
      return alreadyExist;
    }

    if(!validateId(student_id)) {
      return invalidId;
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

const invalidId = {
  meta: {
    message_developer: "ID not valid",
		status_code: 422
  },
  response: null
}

function validateId(student_id) {
  const threeFirstDigits = student_id.substring(0, 3);
  const twoLastDigits = student_id.substring(3, 5);

  let sumOfThreeFirstDigits = 0;
  for(let i = 0; i < threeFirstDigits.length; i++) {
    sumOfThreeFirstDigits += parseInt(threeFirstDigits[i]);
  }

  if(sumOfThreeFirstDigits !== parseInt(twoLastDigits)) {
    return false;
  }
  return true;
}

module.exports = new UserService();