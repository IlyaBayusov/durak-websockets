export const saveTokens = (accessToken: string, refreshToken: string) => {
  if (!accessToken || !refreshToken) {
    return new Error("Ошибка сохранение токенов", {
      cause: {
        accessToken,
        refreshToken,
      },
    });
  }

  localStorage.setItem("accessToken", accessToken);

  localStorage.setItem("refreshToken", refreshToken);
};
