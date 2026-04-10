# Ryotei Share

![Ryotei Share](assets/image/world.png)

https://ryotei-share.vercel.app/

## 📝 Overview

**Ryotei Share** is a simple web application for creating and managing travel itineraries.

### Main Features

- 📅 **Create itineraries in timeline style**: Manage travel schedules chronologically
- 🗂️ **Manage multiple itineraries**: Create and switch between multiple trips
- 🤝 **Share itineraries**: Share your travel plans with others
- 🔐 **Authentication**: User management with Supabase authentication (GitHub, Google)

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material-UI](https://mui.com/) v6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Apollo Client](https://www.apollographql.com/docs/react/)

### Backend & Infrastructure

- **BaaS**: [Supabase](https://supabase.com/) (Authentication & Database)
- **API**: [GraphQL](https://graphql.org/)
- **Type Generation**: [GraphQL Code Generator](https://www.graphql-code-generator.com/)

### Development Tools

- **Component Development**: [Storybook](https://storybook.js.org/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Package Manager**: npm

## 🏗️ Project Architecture

This project follows a **Feature-based Architecture**.

```
ryotei-share/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   └── legal/             # Terms of Use page
├── component/             # UI components
│   ├── Button/
│   ├── Form/
│   ├── Modal/
│   └── Timeline/
├── feature/               # Feature directories
│   ├── auth/              # Authentication
│   ├── provider/          # Providers
│   └── ryotei/            # Itinerary management feature
│       ├── components/    # Components for itinerary management
│       └── hooks/         # Custom hooks
├── utils/                 # Utility functions
├── assets/                # Static assets
└── stories/               # Storybook stories
```

### Design Principles

- Component-driven development with Storybook + MUI
- Type safety with TypeScript + GraphQL Code Generator
- Separation of features and components
- Custom hooks for business logic

## 🚀 Development

- **Hosting**: [Vercel](https://vercel.com/)

```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook

# Generate GraphQL types
npm run codegen

# Build for production
npm run build
```
