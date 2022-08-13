import {
  ErrorResponse,
  SuccessResponse,
  REQUEST_LIMIT_PER_SEC,
} from './NetworkTypes';

// TODO Delay between requests is not working 100% correct.
class RequestGateway {
  private rootUrl = 'https://api.jikan.moe/v4';
  private requestTimeQueue: number[] = [];

  async get<T>(endpoint: string): Promise<SuccessResponse<T> | ErrorResponse> {
    try {
      await this.processRequest();
      console.log('Network request to', endpoint);
      const response = await fetch(this.rootUrl + endpoint);
      const result = await response.json();
      if (result.type && result.message) {
        const error = {
          status: result.status,
          errorName: result.type,
          errorMessage: result.message,
        };
        console.log(
          `RequestGateway::get Response Error: ${error.status}-${error.errorName} message: ${error.errorMessage}`,
        );
        return error;
      } else {
        return {
          result: result as T,
        };
      }
    } catch (error) {
      const _e = error as Error;
      console.error(
        `RequestGateway::get Error: ${_e.name} message: ${_e.message}`,
      );
      return {
        errorName: _e.name,
        errorMessage: _e.message,
      };
    }
  }

  private async processRequest() {
    return new Promise(async resolve => {
      const len = this.requestTimeQueue.push(getSec());
      await this.checkSecLimit(len - 1);
      this.requestTimeQueue[len - 1] = getSec();
      resolve(null);
    });
  }

  private async checkSecLimit(index: number) {
    const len = this.requestTimeQueue.length;
    const prevElement =
      len > REQUEST_LIMIT_PER_SEC
        ? this.requestTimeQueue[index - REQUEST_LIMIT_PER_SEC]
        : undefined;
    if (prevElement === getSec()) {
      await this.delay(index * 1000);
      this.requestTimeQueue[index] = getSec();
      await this.checkSecLimit(index);
    }
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(null), ms));
  }
}

export function isError(a: any): a is ErrorResponse {
  return (a as ErrorResponse).errorMessage !== undefined;
}

const getSec = () => {
  return Math.ceil(Date.now() / 1000);
};

export default new RequestGateway();
