// ...
const register = async ({
    name,
    email, 
    password,
  }) => {
    try {
      const passwordHash = await hashPassword(password); 
  
      const userId = await userRepository.create({
        name,
        email,
        passwordHash, 
        roles: ['user'], 
      });
      return await userRepository.findById(userId);
    } catch (error) {
      throw handleDBError(error);
    }
  };
  // ...
  