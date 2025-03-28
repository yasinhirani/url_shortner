class ApiResponse {
  data: any;
  message: string;
  success: boolean;
  constructor(data: any, message = "") {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;