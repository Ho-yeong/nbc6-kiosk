import { ApplicationError } from '../error';
import { Messages } from '../../../error/messages';

export function formatError(error, overrides = {}) {
  // error 객체는 접근이 불가능 하니 string 으로 변환한뒤 다시 parse
  const stackTrace = JSON.stringify(error, ['stack'], 4) || {};
  const newError = JSON.parse(JSON.stringify(error));

  // 클라이언트에 노출 시킬 필요 X
  newError.statusCode = undefined;
  delete newError.meta;

  // 알수 없는 에러
  if (!newError.code) {
    newError.code = 500;
    newError.message = Messages.ServerError;
  }

  // log 전략은 여기에서
  // console.log(JSON.parse(stackTrace)?.stack);

  return {
    error: {
      ...newError,
    },
    success: false,
    ...overrides,
  };
}

export function formatResponse(result, override = {}) {
  return {
    data: result,
    success: true,
    ...override,
  };
}

export function sendResponse(res, payload, statusCode = 200, context = {}) {
  if (payload instanceof ApplicationError) {
    const code = payload.statusCode || 500;
    return res.status(code).json(formatError(payload));
  }

  // 알수 없는 에러
  if (payload instanceof Error) {
    return res.status(statusCode).json(formatError(payload));
  }

  return res.status(statusCode).json(formatResponse(payload));
}
