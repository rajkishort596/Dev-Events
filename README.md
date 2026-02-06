# 💚🐈 DevEvent: The Ultimate Developer Hub

![DevEvent Hero](public/images/event-full.png)

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**DevEvent** is a premium, high-performance platform designed for developers to discover, create, and manage tech events. From local meetups and global conferences to intense hackathons, DevEvent brings the entire developer community under one digital roof with a stunning, modern interface.

---

## ✨ Features

- **🎯 Event Discovery:** Browse a curated list of featured events with high-fidelity cards.
- **📅 seamless Management:** Create and share your own developer events with ease.
- **⚡ Live Revalidation:** Real-time UI updates after event creation using Next.js revalidation.
- **💎 Premium UI/UX:** Built with Tailwind CSS 4.0, featuring glassmorphism, smooth animations, and interactive light rays.
- **🚀 Smooth Navigation:** Enhanced user experience with high-performance smooth scrolling and optimized layouts.
- **☁️ Cloudinary Integration:** Robust image management for event banners and posters.
- **🔒 Type Safety:** Fully implemented with TypeScript and Zod for reliable data validation.

---

## � Visual Showcase

<div align="center">
  <table>
    <tr>
      <td width="33%"><img src="public/images/event1.png" alt="Event 1" /></td>
      <td width="33%"><img src="public/images/event2.png" alt="Event 2" /></td>
      <td width="33%"><img src="public/images/event3.png" alt="Event 3" /></td>
    </tr>
    <tr>
      <td width="33%"><img src="public/images/event4.png" alt="Event 4" /></td>
      <td width="33%"><img src="public/images/event5.png" alt="Event 5" /></td>
      <td width="33%"><img src="public/images/event6.png" alt="Event 6" /></td>
    </tr>
  </table>
</div>

---

## �🛠️ Tech Stack

- **Framework:** [Next.js 16.1.1 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **File Storage:** [Cloudinary](https://cloudinary.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Animations:** [OGL](https://github.com/o-o-g-l/ogl) & [tw-animate-css](https://github.com/transmutes/tw-animate-css)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/rajkishort596/Dev-Events.git
    cd dev-events
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env.local` file in the root directory and add your credentials:

    ```env
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    MONGODB_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see your app in action!

---

## 📂 Project Structure

```bash
├── app/               # Next.js App Router (Pages, API, Layouts)
├── components/        # Reusable UI Components
├── lib/               # Utility functions and Server Actions
│   ├── actions/       # Database & API logic
│   └── models/        # Mongoose Data Models
├── public/            # Static assets (icons, images)
├── styles/            # Global styling
└── package.json       # Project configurations
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for the Developer Community</p>
