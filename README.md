# Book Shop Application

## Overview

This project is a Book Shop application built using **Vite React**, **Ant Design**, **TypeScript**, and **Redux**. The platform provides a user-friendly interface with secure authentication, smooth product management, and responsive design. It includes features like user registration, role-based authentication, product search, filtering, and a seamless checkout process with payment integration.

---

## Features

- Advanced Product Search and Filtering
  - Users can search for books by title, author, or category.

  - Advanced filters allow sorting by price range, availability, and category.

  - Dynamic updates to search results provide a smooth and intuitive browsing experience.

- Seamless Checkout with Payment Integration
  - Users can add products to their cart and proceed to checkout.

  - Integrated SurjoPay payment gateway ensures secure and hassle-free transactions.

  - Real-time stock validation prevents orders from exceeding available product quantities.
---

## Technologies Used

- **Frontend:**
  - **Vite React**: Fast and modern frontend build tool.
  - **Ant Design**: UI library for designing responsive and visually appealing components.
  - **TypeScript**: Adds static typing to JavaScript for better code quality.
  - **Redux**: State management library for managing global application state.
- **Backend:**
  - **Node.js**: JavaScript runtime for building the backend.
  - **Express.js**: Web framework for building RESTful APIs.
  - **MongoDB**: NoSQL database for storing user and product data.
  - **JWT**: JSON Web Tokens for secure authentication.
- **Payment Gateway:**
  - **SurjoPay**: Integrated for handling payments.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MdSaifulIslamRafsan/L2-A4-BookShop-backend.git
   cd L2-A4-BookShop-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     VITE_API_BASE_URL=http://localhost:5000/api
     ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Open your browser and navigate to `http://localhost:5173`.

---



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, please reach out to:

- **Email:** mdsaifulislamrafsan099@gmail.com

---

Thank you for using the Book Shop Application! Happy reading! 📚
