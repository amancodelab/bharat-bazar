const jwtProvider = require("../../utils/JwtProvider");

const createAccessTokenFromRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const accessToken =
    jwtProvider.createAccessTokenFromRefreshToken(refreshToken);

  return accessToken;
};

module.exports = createAccessTokenFromRefreshToken;