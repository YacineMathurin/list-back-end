import { MoviesMiddleware } from './movies.middleware';

describe('MoviesMiddleware', () => {
  it('should be defined', () => {
    expect(new MoviesMiddleware()).toBeDefined();
  });
});
