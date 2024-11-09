export const ERROR_MESSAGE = {
  FORBIDDEN: 'Permissão insuficiente para executar esta ação.',
  LOGIN_FAILED: 'Usuário ou senha inválidos',
  UNAUTHORIZED: 'Faça o login para continuar',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor',
  CONFLICT: 'Usuário/email já existentes',
} 

export const getErrorMessage = (status?: number) => {
  if(status) {
    switch (status) {
      case 401:
        return ERROR_MESSAGE.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGE.FORBIDDEN;
      case 409:
        return ERROR_MESSAGE.CONFLICT;
      default:
        return ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    }
  } else {
    return ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
  }
}