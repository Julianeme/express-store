# Simple Store Project

This is a simple store project developed using Node.js, Express, Boom, Faker and Joi. It's designed for practicing purposes and reviewing key concepts such as single responsibility, separation of services and routers, and implementation of middlewares for error detection, handling, and data validation.

## Features

- Basic CRUD operations for products endpoint only (GET, PUT, PATCH, DELETE).
- API routes are organized in v1 and v2 versions for educational purposes. Only v1 is fully operative.

## Technologies Used

- Node.js
- Express
- Boom
- Joi
- Faker

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the server using `npm start`.

## API Endpoints

### Version 1 (v1)

- `GET /api/v1/products`: Retrieve a list of products.
- `GET /api/v1/products/:id`: Retrieve a specific product by ID.
- `PUT /api/v1/products/:id`: Update a specific product by ID.
- `PATCH /api/v1/products/:id`: Partially update a specific product by ID.
- `DELETE /api/v1/products/:id`: Delete a specific product by ID.

### Version 2 (v2)

- These routes are provided for educational purposes and are not fully operative.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Disclaimer

This project is for educational purposes only. It may not include complete security measures or real-world features.

## Acknowledgments

Thank you to the open-source community for the tools and libraries used in this project.
