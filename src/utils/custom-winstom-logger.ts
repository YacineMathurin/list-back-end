export function customWinstomLogger(err, logger) {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` });
  } else {
    logger.log({ level: 'info', message: err });
  }
}
