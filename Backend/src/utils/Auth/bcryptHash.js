const bcrypt = require('bcrypt');

const bcryptHash = async (item, salt = 10) => {
  try {
    const hash = await bcrypt.hash(item, salt);
    return hash;
  } catch (error) {
    console.error("Error Message:", error.message);
    throw new Error(`Failed to get the Bcrypt  from the item\nError Message:${error.message}`);
  };
};

module.exports = bcryptHash;