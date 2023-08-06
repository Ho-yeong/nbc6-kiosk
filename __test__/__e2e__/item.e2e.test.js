import request from 'supertest';
import { sequelize } from '../../src/db';
import { itemType } from '../../src/constants';
import { Server } from '../../src/init';

const server = new Server();

const baseUrl = 'http://localhost:3000';

describe('e2e - Item', () => {
  beforeAll(async () => {
    // 데이터 초기화
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /item', () => {
    it('should create an item', async () => {
      const item = {
        name: '아메리카노',
        price: 3500,
        type: itemType.COFFEE,
      };

      const response = await request(server.expressApp.app)
        .post('/api/item')
        .send(item)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
    });
  });

  describe('GET /item', () => {
    it('should get items', async () => {
      const response = await request(server.expressApp.app).get('/api/item/all');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
