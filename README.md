# Brighte Eats - Lead Registration System

A Next.js application with GraphQL API for registering customer interest in Brighte Eats services (delivery, pick-up, payment).

## 🚀 Features

- **GraphQL API** with Apollo Server
- **Lead Registration** - Capture customer interest
- **Dashboard** - View and manage leads
- **PostgreSQL Database** with Prisma ORM
- **Modern UI** with Tailwind CSS
- **Type Safety** with TypeScript

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **API**: GraphQL with Apollo Server
- **Frontend**: React with Apollo Client
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## ⚡ Quick Start

### 1. Database Setup

Create a PostgreSQL database and set up your environment variables:

```bash
# Create .env file with your PostgreSQL connection details
echo 'DATABASE_URL="postgresql://username:password@localhost:5432/brighte_eats?schema=public"' > .env
```

Replace `username`, `password`, and adjust the connection string for your PostgreSQL setup.

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **GraphQL API**: http://localhost:3000/api/graphql

## 🧪 Testing

### Manual Testing

1. **Frontend Testing**:
   - Navigate to http://localhost:3000
   - Fill out the registration form with test data
   - Switch to "View Dashboard" to see registered leads

2. **GraphQL API Testing**:
   - Use a GraphQL client like GraphiQL, Apollo Studio, or Postman
   - Endpoint: `http://localhost:3000/api/graphql`

### GraphQL API Examples

**Register a new lead:**
```graphql
mutation RegisterLead {
  register(input: {
    name: "John Doe"
    email: "john@example.com"
    mobile: "0412345678"
    postcode: "2000"
    services: [DELIVERY, PAYMENT]
  }) {
    id
    name
    email
    services
    createdAt
  }
}
```

**Get all leads:**
```graphql
query GetAllLeads {
  leads {
    id
    name
    email
    mobile
    postcode
    services
    createdAt
  }
}
```

**Get specific lead:**
```graphql
query GetLead {
  lead(id: 1) {
    id
    name
    email
    mobile
    postcode
    services
    createdAt
  }
}
```

### Services Available
- `DELIVERY` - Food delivery service
- `PICKUP` - Order pickup service  
- `PAYMENT` - Payment processing service

## 🗄️ Database Schema

```prisma
model Lead {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  mobile    String
  postcode  String
  services  String[] // Array of: delivery, pickup, payment
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📁 Project Structure

```
brighte-eats/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   └── app/
│       ├── api/
│       │   └── graphql/
│       │       └── route.ts   # GraphQL API endpoint
│       ├── layout.tsx         # App layout with Apollo Provider
│       └── page.tsx           # Frontend UI
├── lib/
│   ├── apolloClient.ts        # Apollo Client setup
│   ├── apollo-wrapper.tsx     # Apollo Provider wrapper
│   └── prisma.ts              # Prisma client
├── graphql/
│   ├── schema.ts              # GraphQL type definitions
│   └── resolvers.ts           # GraphQL resolvers
└── .env                       # Environment variables
```

## 🔧 Environment Variables

Required environment variables (already covered in Quick Start):

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/brighte_eats?schema=public"
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify database credentials

### GraphQL Errors
- Check browser console for detailed errors
- Verify Prisma client is generated: `npx prisma generate`
- Ensure database migrations are applied: `npx prisma migrate dev`

### Build Issues
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📝 API Documentation

The GraphQL schema includes:

### Types
- `Lead` - Customer lead information
- `Service` - Available services enum

### Queries
- `leads` - Get all registered leads
- `lead(id: Int!)` - Get specific lead by ID

### Mutations
- `register(input: RegisterInput!)` - Register new lead

### Input Types
- `RegisterInput` - Required fields for lead registration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for demonstration purposes as part of the Brighte technical assessment.
