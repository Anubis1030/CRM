# Professional CRM System

A modern, responsive Customer Relationship Management (CRM) system built with React and Tailwind CSS. This enterprise-grade application supports two user roles (Agent and Admin) with comprehensive client management, visit tracking, reporting, and administrative features.

## 🚀 Features

### Authentication
- Secure login with email/password + OTP verification
- Role-based access control (Agent/Admin)
- Session management and automatic logout

### Agent Features
- **Dashboard**: Personal KPIs and activity overview
- **Add Client**: Comprehensive client onboarding form
- **My Clients**: View and manage assigned clients
- **Visit Notes**: Add interaction notes with clients
- **Search Client**: Find clients across the database
- **Profile Settings**: Update personal information and preferences

### Admin Features
- **Dashboard**: System-wide analytics and metrics
- **All Clients**: Full client database management
- **Visit Notes Manager**: Oversee all agent interactions
- **Manage Agents**: User management and performance tracking
- **Duplicate Checker**: Identify and merge duplicate records
- **Reports & Analytics**: Comprehensive business intelligence
- **System Settings**: Configure CRM system parameters
- **Search**: Advanced client search with filters

## 🛠 Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for modern iconography
- **Routing**: React Router for navigation
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form for validation
- **Notifications**: React Hot Toast for user feedback
- **Build Tool**: Vite for fast development and building

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Professional, trustworthy
- **Success**: Green (#10b981) - Positive actions
- **Warning**: Yellow (#f59e0b) - Caution states
- **Error**: Red (#ef4444) - Error states
- **Gray Scale**: Comprehensive gray palette for UI elements

### Typography
- **Font**: Inter - Clean, professional, highly readable
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Cards**: Clean white backgrounds with subtle shadows
- **Buttons**: Primary/secondary variants with hover states
- **Forms**: Consistent input styling with validation states
- **Tables**: Sortable, paginated, responsive data display
- **Modals**: Accessible overlay dialogs

## 📱 Responsive Design

The CRM system is fully responsive and works seamlessly across:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Mobile-first design with touch-friendly interactions

## 🔐 Authentication Demo

For demonstration purposes, use these credentials:

**Admin Access:**
- Email: `admin@company.com`
- Password: Any password
- OTP: Any 6-digit code

**Agent Access:**
- Email: `agent@company.com`
- Password: Any password
- OTP: Any 6-digit code

## 📊 Key Components

### Reusable UI Components
- `StatsCard`: KPI display widgets
- `Table`: Sortable, paginated data tables
- `Modal`: Accessible dialog overlays
- `Sidebar`: Role-based navigation
- `Header`: Page headers with breadcrumbs

### Page Components
- `Dashboard`: Role-specific overview pages
- `AddClient`: Multi-section client onboarding
- `MyClients`/`AllClients`: Client management interfaces
- `VisitNotes`: Interaction tracking
- `SearchClient`: Advanced search functionality
- `Reports`: Analytics and data visualization
- `Profile`: User settings and preferences

## 🔧 Configuration

### Environment Variables
Create a `.env` file for configuration:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=CRM System
VITE_APP_VERSION=1.0.0
```

### Tailwind Configuration
The system uses a custom Tailwind configuration with:
- Extended color palette
- Custom component classes
- Responsive breakpoints
- Typography scale
