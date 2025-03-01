import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import imageController from '../controllers/imagesController'; // Ajusta la ruta según tu estructura

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/images', imageController.image);
app.use('/api/images', imageController.transformImage);
app.use('/api/images', imageController.getOneImage);
app.use('/api/images', imageController.getAllImages);

describe('Image Controller', () => {
  // Mock del servicio de imágenes
  const mockImageService = {
    imageUpload: jest.fn(),
    imageCreateObject: jest.fn(),
    transformImage: jest.fn(),
    getOneImage: jest.fn(),
    getAllImages: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/images', () => {
    it('should upload an image successfully', async () => {
      const mockUrl = 'http://example.com/image.jpg';
      const mockImage = { /* objeto de imagen simulado */ };
      const mockUserId = '1234';

      mockImageService.imageUpload.mockResolvedValue(mockUrl);
      mockImageService.imageCreateObject.mockResolvedValue(mockImage);

      const response = await request(app)
        .post('/api/images')
        .set('Cookie', ['access_token=valid_token'])
        .send({ img: 'image_data', userId: mockUserId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Image uploaded successfully');
      expect(response.body.data).toEqual(mockImage);
    });

    it('should return error if no token is provided', async () => {
      const response = await request(app)
        .post('/api/images')
        .send({ img: 'image_data', userId: '1234' });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Access denied');
    });

    it('should return error if no image is provided', async () => {
      const response = await request(app)
        .post('/api/images')
        .set('Cookie', ['access_token=valid_token'])
        .send({ userId: '1234' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('No file uploaded');
    });
  });

  describe('POST /api/images/:id/transform', () => {
    it('should transform an image successfully', async () => {
      const mockId = 'imageId';
      const mockTransformations = { /* transformaciones simuladas */ };
      const transformedUrl = 'http://example.com/transformed_image.jpg';

      mockImageService.transformImage.mockResolvedValue(transformedUrl);

      const response = await request(app)
        .post(`/api/images/${mockId}/transform`)
        .set('Cookie', ['access_token=valid_token'])
        .send({ transformations: mockTransformations });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Image transformed successfully');
      expect(response.body.data).toBe(transformedUrl);
    });

    it('should return error if no token is provided', async () => {
      const response = await request(app)
        .post('/api/images/imageId/transform')
        .send({ transformations: {} });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Access denied');
    });
  });

  describe('GET /api/images/:id', () => {
    it('should get one image successfully', async () => {
      const mockId = 'imageId';
      const mockUserId = '1234';
      const mockImage = { /* objeto de imagen simulado */ };

      mockImageService.getOneImage.mockResolvedValue(mockImage);

      const response = await request(app)
        .get(`/api/images/${mockId}`)
        .set('Cookie', ['access_token=valid_token'])
        .query({ userId: mockUserId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Image get successfully');
      expect(response.body.data).toEqual(mockImage);
    });

    it('should return error if no token is provided', async () => {
      const response = await request(app)
        .get('/api/images/imageId')
        .query({ userId: '1234' });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Access denied');
    });
  });

  describe('GET /api/images', () => {
    it('should get all images successfully', async () => {
      const mockUserId = '1234';
      const mockImages = [{ /* objeto de imagen simulado */ }];

      mockImageService.getAllImages.mockResolvedValue(mockImages);

      const response = await request(app)
        .get('/api/images')
        .set('Cookie', ['access_token=valid_token'])
        .query({ userId: mockUserId, page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Image get successfully');
      expect(response.body.data).toEqual(mockImages);
    });

    it('should return error if no token is provided', async () => {
      const response = await request(app)
        .get('/api/images')
        .query({ userId: '1234', page: 1, limit: 10 });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Access denied');
    });
  });
});
