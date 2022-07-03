const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  async register(student_id, password) {
    const isUserExist = await User.findOne({ where: { student_id } });

    if (isUserExist) {
      return alreadyExist;
    }

    if (!validateId(student_id)) {
      return invalidId;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({ student_id, password: hashPassword });
    return successfullyAdded;
  }

  async login(student_id, password) {
    const user = await User.findOne({ where: { student_id: student_id } });
    if (!user) {
      return accountNotExist;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return notMatchPassword;
    }

    const userId = user.student_id;
    const accessToken = jwt.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn: '60s'
    });

    const refreshToken = jwt.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: '1d'
    });

    await User.update({ refresh_token: refreshToken }, {
      where: {
        student_id: userId
      }
    });

    return sucessfullyLogin(accessToken);
  }

  async logout(refreshToken) {
    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return accountNotExist;
    }

    const userId = user.student_id;
    await User.update({ refreshToken: null }, { where: { student_id: userId } });
    return {
      status_code: 404
    }
  }

}


const sucessfullyLogin = (accessToken, refresh_token) => {
  return {
    meta: {
      message_developer: "Successfully login",
      status_code: 400
    },
    response: {
      accessToken,
      refresh_token
    }
  }
}

const sucessfullyLogout = {
  meta: {
    message_developer: "Successfully logout",
    status_code: 400
  },
  response: {
    refresh_token: null
  }
}

const notMatchPassword = {
  meta: {
    message_developer: "Password not match",
    status_code: 401
  },
  response: null
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

const accountNotExist = {
  meta: {
    message_developer: "Account not exist!",
    status_code: 401
  },
  response: null
}

function validateId(student_id) {
  const threeFirstDigits = student_id.substring(0, 3);
  const twoLastDigits = student_id.substring(3, 5);

  let sumOfThreeFirstDigits = 0;
  for (let i = 0; i < threeFirstDigits.length; i++) {
    sumOfThreeFirstDigits += parseInt(threeFirstDigits[i]);
  }

  if (sumOfThreeFirstDigits !== parseInt(twoLastDigits)) {
    return false;
  }
  return true;
}

module.exports = new UserService();