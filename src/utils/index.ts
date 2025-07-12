export const saveTokens = (accessToken: string, refreshToken: string) => {
  if (!accessToken || !refreshToken) {
    return console.error(
      "Ошибка сохранение токенов",
      accessToken,
      refreshToken
    );
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
