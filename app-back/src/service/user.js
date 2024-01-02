const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const userRepository = require('../repository/users');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const generateJavaWebToken = async (user) => {
  debugLog(`Generating JWT for ${user.name}`);
  const jwtPackage = {
    name: user.name,
    permission: user.role,
  };
  const token = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
    expiresIn: 36000,
    issuer: process.env.AUTH_ISSUER,
    audience: process.env.AUTH_AUDIENCE,
  });
  return token;
};

const getByToken = async (token) => {
  debugLog(`Decoding token ${token}`);
  const decodedUser = jwt.decode(token);
  console.log(decodedUser);
  const user = await userRepository.findByName(decodedUser.name);
  const {
    salt,
    hash,
    ...rest
  } = user;
  return user;
};

const getById = async (id) => {
  debugLog(`Fetching user with id: ${id}`);
  const user = await userRepository.findById(id);
  return user;
};

const getAllEmployees = async (companyID) => {
  debugLog(`Fetching all employees with companyID ${companyID}`);
  try {
    const employees = await userRepository.getAllEmployees(companyID);
    return employees;
  } catch (e) {
    throw ServiceError.notFound(`${companyID} was not found`);
  }
};

const promote = async ({
  token,
  name,
  role
}) => {
  debugLog(`Promoting user with ${name} to ${role}`);
  //const decodedAdmin = await getByToken(token);
  const user = await userRepository.findByName(name);
  console.log(user);
  const promotedUserId = await userRepository.updateById(user.id, {
    ...user,
    role,
  });
};


const register = async ({
  name,
  password,
}) => {
  debugLog(`Creating user with name ${name}`);
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  const newUser = {
    name,
    salt,
    hash,
  };
  try {
    const user = await userRepository.create(newUser);

    const jwtPackage = {
      name: user.name,
      permission: user.role,
    };
    return {
      bearer: jwt.sign(jwtPackage, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      })
    };
  } catch (error) {
    if (error.message === 'DUPLICATE_ENTRY') {
      throw ServiceError.duplicate('DUPLICATE ENTRY');
    } else {
      throw ServiceError.validationFailed(error.message);
    }
  }
};

const login = async ({
  name,
  password,
}) => {
  debugLog(`Verifying user with email ${name}`);
  const verification = {
    token: undefined,
    validated: false,
  };
  const user = await userRepository.findByName(name);

  if (!user) {
    throw ServiceError.notFound(`There is no user with name ${name}`);
  }
  const result = user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha256').toString('base64');
  if (result) {
    const token = await generateJavaWebToken(user);
    verification.token = token;
    verification.validated = true;
  } else {
    throw ServiceError.forbidden(`Verification failed for user with email ${email}`);
  }

  return verification;
};

const verify = async ({
  token,
}) => {
  debugLog(`Verifying token ${token}`);
  const verification = {
    token: undefined,
    validated: false,
  };
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
  } catch (error) {
    throw ServiceError.validationFailed(`Verification failed for token ${token}`);
  }
  const user = await userRepository.findByName(decoded.name);
  if (!user) {
    throw ServiceError.notFound('user does not exist');
  }
  if (user.role !== decoded.permission) {
    const jwtPackage = {
      name: user.name,
      permission: user.role,
    };

    const newToken = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
      expiresIn: 36000,
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
    verification.token = newToken;
    verification.validated = true;
    return verification;
  }
  if (decoded) {
    verification.validated = true;
    return verification;
  }

  return verification;
};

const update = async (token, {
  name,
}) => {
  const decodedUser = await getByToken(token);
  //const originalName = decodedUser.name;
  //const user = await getUserByEmail(originalEmail);
  debugLog(`updating user with id ${decodedUser.id}`);
  const updatedUserId = await userRepository.updateById(decodedUser.id, {
    name: (name || decodedUser.name),
  });
  const updatedUser = await userRepository.findById(updatedUserId);
  const verification = {
    token: undefined,
    validated: false,
  };
  if (updatedUser) {
    const updatedToken = await generateJavaWebToken(updatedUser);
    const formatedUpdatedUser = await userRepository.formatUser(updatedUser);
    verification.token = updatedToken;
    verification.updatedUser = formatedUpdatedUser;
    verification.validated = true;
  }
  return verification;
};

module.exports = {
  getByToken,
  getById,
  register,
  login,
  verify,
  update,
  getAllEmployees,
  promote,
};