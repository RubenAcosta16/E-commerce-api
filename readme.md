# APi de https://roadmap.sh/projects/ecommerce-api

Primero que nada:

Instala las dependencias utilizando `pnpm`:

```bash
pnpm install
```

Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:

```bash
pnpm run dev
```

# Rutas

# User

## Base URL

```
/api/v1/user
```

## Rutas

### 1. **Registrar un Usuario**

- **Método:** `POST`
- **Endpoint:** `/register`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "_id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 2. **Iniciar Sesión**

- **Método:** `POST`
- **Endpoint:** `/login`
- **Descripción:** Inicia sesión y devuelve un token de acceso.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "User logged in successfully",
    "data": {
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "token": "string"
    }
  }
  ```

### 3. **Cerrar Sesión**

- **Método:** `POST`
- **Endpoint:** `/logout`
- **Descripción:** Cierra la sesión del usuario.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### 4. **Ruta Protegida**

- **Método:** `GET`
- **Endpoint:** `/protected`
- **Descripción:** Obtiene información del usuario autenticado.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "data": {
      "_id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 5. **Agregar a Favoritos**

- **Método:** `POST`
- **Endpoint:** `/favorite`
- **Descripción:** Agrega un producto a la lista de favoritos del usuario.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "productId": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product added to favorites"
  }
  ```

### 6. **Obtener Favoritos**

- **Método:** `GET`
- **Endpoint:** `/favorite`
- **Descripción:** Obtiene la lista de productos favoritos del usuario.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Get products favorites successfully",
    "data": ["string", "string", ...] // Lista de IDs de productos
  }
  ```

### 7. **Eliminar de Favoritos**

- **Método:** `DELETE`
- **Endpoint:** `/favorite/:id`
- **Descripción:** Elimina un producto de la lista de favoritos del usuario.
- **Parámetros:**
  - **id:** ID del producto a eliminar.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product removed from favorites successfully"
  }
  ```

# Image

## Base URL

```
/api/v1/image
```

## Rutas

### 1. **Subir Imagen**

- **Método:** `POST`
- **Endpoint:** `/upload`
- **Descripción:** Sube una nueva imagen al sistema.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`, `uploadImage`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "productId": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Image uploaded successfully",
    "data": {
      "_id": "string",
      "url": "string",
      "productId": "string"
    }
  }
  ```

### 2. **Obtener Imagen**

- **Método:** `GET`
- **Endpoint:** `/:id`
- **Descripción:** Obtiene una imagen específica por su ID.
- **Parámetros:**
  - **id:** ID de la imagen.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Image get successfully",
    "data": {
      "_id": "string",
      "url": "string",
      "productId": "string"
    }
  }
  ```

## Ejemplo de Uso

- Para subir una imagen:

  ```
  POST /api/v1/image/upload
  ```

- Para obtener una imagen por ID:

  ```
  GET /api/v1/image/:id
  ```

  # Category

## Base URL

```
/api/v1/category
```

## Rutas

### 1. **Crear Categoría**

- **Método:** `POST`
- **Endpoint:** `/`
- **Descripción:** Crea una nueva categoría.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Category created successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

### 2. **Obtener Todas las Categorías**

- **Método:** `GET`
- **Endpoint:** `/`
- **Descripción:** Obtiene todas las categorías.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Categories found successfully",
    "data": [
      {
        "_id": "string",
        "name": "string",
        "description": "string"
      },
      ...
    ]
  }
  ```

### 3. **Obtener una Categoría**

- **Método:** `GET`
- **Endpoint:** `/:id`
- **Descripción:** Obtiene una categoría específica por su ID.
- **Parámetros:**
  - **id:** ID de la categoría.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Category found successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

### 4. **Actualizar Categoría**

- **Método:** `PUT`
- **Endpoint:** `/:id`
- **Descripción:** Actualiza una categoría existente.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Parámetros:**
  - **id:** ID de la categoría a actualizar.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Category updated successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

### 5. **Eliminar Categoría**

- **Método:** `DELETE`
- **Endpoint:** `/:id`
- **Descripción:** Elimina una categoría específica.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Parámetros:**
  - **id:** ID de la categoría a eliminar.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Category deleted successfully"
  }
  ```

## Ejemplo de Uso

- Para crear una categoría:

  ```
  POST /api/v1/category/
  ```

- Para obtener todas las categorías:

  ```
  GET /api/v1/category/
  ```

- Para obtener una categoría por ID:

  ```
  GET /api/v1/category/:id
  ```

- Para actualizar una categoría:

  ```
  PUT /api/v1/category/:id
  ```

- Para eliminar una categoría:
  ```
  DELETE /api/v1/category/:id
  ```

# Product

## Base URL

```
/api/v1/product
```

## Rutas

### 1. **Crear Producto**

- **Método:** `POST`
- **Endpoint:** `/`
- **Descripción:** Crea un nuevo producto.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "image": "string",
    "category": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product created successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "image": "string",
      "category": "string"
    }
  }
  ```

### 2. **Obtener Todos los Productos**

- **Método:** `GET`
- **Endpoint:** `/`
- **Descripción:** Obtiene todos los productos.
- **Cuerpo de la Solicitud (opcional):**
  ```json
  {
    "search": "string",
    "category": "string",
    "minPrice": "number",
    "maxPrice": "number",
    "page": "number",
    "limit": "number"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Products found successfully",
    "data": [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "image": "string",
        "category": "string"
      },
      ...
    ]
  }
  ```

### 3. **Obtener un Producto**

- **Método:** `GET`
- **Endpoint:** `/:id`
- **Descripción:** Obtiene un producto específico por su ID.
- **Parámetros:**
  - **id:** ID del producto.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product found successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "image": "string",
      "category": "string"
    }
  }
  ```

### 4. **Actualizar Producto**

- **Método:** `PUT`
- **Endpoint:** `/:id`
- **Descripción:** Actualiza un producto existente.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Parámetros:**
  - **id:** ID del producto a actualizar.
- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "image": "string",
    "category": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product updated successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "image": "string",
      "category": "string"
    }
  }
  ```

### 5. **Eliminar Producto**

- **Método:** `DELETE`
- **Endpoint:** `/:id`
- **Descripción:** Elimina un producto específico.
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Parámetros:**
  - **id:** ID del producto a eliminar.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

## Ejemplo de Uso

- Para crear un producto:

  ```
  POST /api/v1/product/
  ```

- Para obtener todos los productos:

  ```
  GET /api/v1/product/
  ```

- Para obtener un producto por ID:

  ```
  GET /api/v1/product/:id
  ```

- Para actualizar un producto:

  ```
  PUT /api/v1/product/:id
  ```

- Para eliminar un producto:
  ```
  DELETE /api/v1/product/:id
  ```

# Cart

## Base URL

```
/api/v1/cart
```

## Rutas

### 1. **Agregar al Carrito**

- **Método:** `POST`
- **Endpoint:** `/`
- **Descripción:** Agrega un producto al carrito del usuario.
- **Middleware:** `authMiddleware`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "productId": "string",
    "quantity": "string"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Product added to cart successfully",
    "data": {
      "_id": "string",
      "userId": "string",
      "products": [
        {
          "productId": "string",
          "quantity": "number"
        }
      ]
    }
  }
  ```

### 2. **Obtener Carrito del Usuario**

- **Método:** `GET`
- **Endpoint:** `/`
- **Descripción:** Obtiene el carrito del usuario autenticado.
- **Middleware:** `authMiddleware`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Cart found successfully",
    "data": {
      "_id": "string",
      "userId": "string",
      "products": [
        {
          "productId": "string",
          "quantity": "number"
        }
      ]
    }
  }
  ```

### 3. **Eliminar Producto del Carrito**

- **Método:** `POST`
- **Endpoint:** `/:productId`
- **Descripción:** Elimina un producto específico del carrito del usuario.
- **Middleware:** `authMiddleware`
- **Parámetros:**
  - **productId:** ID del producto a eliminar.
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Remove item from cart successfully"
  }
  ```

### 4. **Eliminar Todos los Productos del Carrito**

- **Método:** `DELETE`
- **Endpoint:** `/`
- **Descripción:** Elimina todos los productos del carrito del usuario.
- **Middleware:** `authMiddleware`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "All cart removed successfully"
  }
  ```

## Ejemplo de Uso

- Para agregar un producto al carrito:

  ```
  POST /api/v1/cart/
  ```

- Para obtener el carrito del usuario:

  ```
  GET /api/v1/cart/
  ```

- Para eliminar un producto del carrito:

  ```
  POST /api/v1/cart/:productId
  ```

- Para eliminar todos los productos del carrito:
  ```
  DELETE /api/v1/cart/
  ```

# Payment

## Base URL

```
/api/v1/payment
```

## Rutas

### 1. **Crear Pago**

- **Método:** `POST`
- **Endpoint:** `/`
- **Descripción:** Crea un nuevo pago para el usuario autenticado.
- **Middleware:** `authMiddleware`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Payment pending...",
    "data": {
      "_id": "string",
      "userId": "string",
      "amount": "number",
      "currency": "string",
      "status": "pending",
      "transactionId": "string"
    }
  }
  ```

### 2. **Pago Completado**

- **Método:** `POST`
- **Endpoint:** `/completed`
- **Descripción:** Maneja la notificación de un pago completado.
- **Cuerpo de la Solicitud:**
  - **Tipo:** `application/json`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Payment done successfully"
  }
  ```

### 3. **Pago Fallido**

- **Método:** `POST`
- **Endpoint:** `/failed`
- **Descripción:** Maneja la notificación de un pago fallido.
- **Cuerpo de la Solicitud:**
  - **Tipo:** `application/json`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Payment failed"
  }
  ```

### 4. **Obtener Todos los Pagos**

- **Método:** `GET`
- **Endpoint:** `/allPayments`
- **Descripción:** Obtiene todos los pagos (solo para administradores).
- **Middleware:** `authMiddleware`, `authAdminMiddleware`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Payments found successfully",
    "data": [
      {
        "_id": "string",
        "userId": "string",
        "amount": "number",
        "currency": "string",
        "status": "string",
        "transactionId": "string"
      },
      ...
    ]
  }
  ```

### 5. **Obtener Pagos del Usuario**

- **Método:** `GET`
- **Endpoint:** `/`
- **Descripción:** Obtiene todos los pagos del usuario autenticado.
- **Middleware:** `authMiddleware`
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Cuerpo:**
  ```json
  {
    "message": "Payments found successfully",
    "data": [
      {
        "_id": "string",
        "userId": "string",
        "amount": "number",
        "currency": "string",
        "status": "string",
        "transactionId": "string"
      },
      ...
    ]
  }
  ```

## Ejemplo de Uso

- Para crear un pago:

  ```
  POST /api/v1/payment/
  ```

- Para manejar un pago completado:

  ```
  POST /api/v1/payment/completed
  ```

- Para manejar un pago fallido:

  ```
  POST /api/v1/payment/failed
  ```

- Para obtener todos los pagos:

  ```
  GET /api/v1/payment/allPayments
  ```

- Para obtener los pagos del usuario:
  ```
  GET /api/v1/payment/
  ```
