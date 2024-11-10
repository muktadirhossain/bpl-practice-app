// responseHandler.ts
class SuccessHandler {
  constructor(message: string, data: any = null) {
    return {
      success: true,
      message,
      data,
    };
  }
}

export default SuccessHandler;
