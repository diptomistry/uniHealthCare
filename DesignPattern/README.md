## Higher-Order Component (HOC) for Loading State

This project includes a **Higher-Order Component (HOC)** that wraps any component and adds a loading state functionality to it. The `withLoading` HOC shows a full-screen loading spinner (`FullScreenLoader`) when the `isLoading` state is true. This is a convenient way to manage loading states for components, keeping our components focused on their core functionality without handling the loading state directly.

### Key Features
- **Separation of concerns**: The `withLoading` HOC allows for cleaner, more modular code by separating loading logic from the core component logic.
- **Reusability**: This HOC can be reused across multiple components that require a loading state, avoiding repetitive code for loading management.
- **Customizable**: We can easily customize the loading indicator or the conditions under which it appears by modifying the `FullScreenLoader` or the HOC itself.

### How It Works
1. **`withLoading` HOC**: 
   - The `withLoading` function accepts a component and adds loading logic to it.
   - If `isLoading` is true, it displays the `FullScreenLoader` component on top of the wrapped component.


## Content Management Factory Pattern
```markdown


## Overview
Implements the Factory Pattern for creating and managing content types (Blog, Service, Quote) with a unified interface and encapsulated logic.

## Structure

### Factory Class: `ContentFactory`
Creates content instances based on type:
```javascript
class ContentFactory {
  createContent(type, title, description, image) { ... }
}
```

### Base Class: `ContentItem`
Defines shared properties and `createFormData()` method:
```javascript
class ContentItem {
  constructor(title, description, image, isBlog, isQuote) { ... }
  async createFormData() { ... }
}
```

### Content Types
- `BlogContent`
- `ServiceContent`
- `QuoteContent`

## Usage
```javascript
import ContentFactory from './contentFactory';

const factory = new ContentFactory();
const blogContent = factory.createContent('blog', 'Title', 'Description', imageFile);
const formData = await blogContent.createFormData();
```

## API Integration
- **Headers**: 
  ```javascript
  { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  ```
- **FormData Fields**: `title`, `description`, `isBlog`, `isQuote`, `file`.

## Extending
Add new types by creating a new class extending `ContentItem` and updating `ContentFactory`.

## Debugging
Enable detailed logs:
```javascript
console.log('Content:', { title: this.title, description: this.description, imageType: typeof this.image });
```

## Diagram Flow
User Action (e.g., "Create Blog") 
        ↓
ContentManager (Client)
        ↓
ContentFactory (Factory)
        ↓
Determines Type (Switch Statement)
        ↓
Creates Object (e.g., BlogContent, ServiceContent, QuoteContent)
        ↓
Returns Object to ContentManager
        ↓
Calls createFormData() on Object
        ↓
Formatted Data is Sent to Backend



# React Button Decorator Pattern

## Overview
This implementation demonstrates the Decorator design pattern for managing button state and functionality in React applications.

## Key Features
- Dynamic button state modification
- Flexible UI enhancement
- Separation of concerns
- Easy button behavior extension

## Pattern Implementation
The `DecoratorPatternForDisablingBtn` higher-order component (HOC) decorates the original button:
- Adds disabled state
- Applies visual feedback (opacity, cursor)
- Preserves original button properties

## Usage Example
```jsx
const DecoratedConfirmButton = DecoratorPatternForDisablingBtn(OriginalButton);

<DecoratedConfirmButton isDisabled={condition} />
```

## Benefits
- Modular button state management
- Easily composable
- Maintains single responsibility principle

## Potential Extensions
- Add loading states
- Implement conditional styling
- Create multiple decorator layers

## Best Practices
- Keep decorators focused
- Avoid excessive nesting
- Preserve original component's core functionality

# SpecificRouteProtection Guard Pattern

This repository implements the **Guard Pattern** in a React/Next.js application to protect specific routes based on user roles. The `SpecificRouteProtection` component ensures only authorized users with the appropriate roles can access certain parts of the application. Unauthorized users are redirected to a login page.

---

## **What is the Guard Pattern?**
The Guard Pattern is a design pattern that restricts access to certain parts of an application by validating conditions (e.g., user authentication or role-based authorization). It acts as a gatekeeper to protect resources and routes, ensuring that only users who meet specific criteria can access them.

In this implementation, the guard checks for a valid `role` and either renders the content for authorized users or redirects unauthorized users.

---

## **How It Works**

The `SpecificRouteProtection` component is a reusable React component that wraps protected content and enforces access control based on the provided `role` prop.

### **Code Overview**
```tsx
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  role?: string;
}

export default function SpecificRouteProtection({ children, role }: Props) {
  const router = useRouter();

  if (role === undefined) {
    router.push("/login");
    return null; // Prevent rendering while redirecting
  }

  return <>{children}</>;
}
```

### **Features**
1. **Condition-Based Access**: The guard checks if the `role` prop is defined.
2. **Redirection**: If the condition is not met, users are redirected to the `/login` page.
3. **Reusable**: The component can wrap any part of the application to enforce role-based access control.

### **Usage**
1. Import the `SpecificRouteProtection` component.
2. Wrap the component or content you want to protect with `SpecificRouteProtection`.
3. Pass the user role as a prop to determine access.

#### **Example**
```tsx
import SpecificRouteProtection from "./SpecificRouteProtection";

export default function DashboardPage() {
  const userRole = "admin"; // Example user role fetched from state or context

  return (
    <SpecificRouteProtection role={userRole}>
      <h1>Welcome to the Admin Dashboard</h1>
    </SpecificRouteProtection>
  );
}
```
In this example, only users with a defined `userRole` will see the dashboard. If `userRole` is `undefined`, they are redirected to the login page.

---

## **Advantages**
- **Simplifies Access Control**: Centralizes route protection logic in a reusable component.
- **Improves Security**: Prevents unauthorized users from accessing protected routes or components.
- **Flexibility**: Can be extended to include more complex conditions, such as role hierarchies or feature flags.

---

## **Enhancements and Best Practices**

### **1. Handle Redirect Loops**
Ensure the redirect logic only executes on the client side or when the component is mounted to avoid server-side rendering (SSR) issues or infinite loops.

### **2. Show a Loading State**
Improve user experience by displaying a loading indicator during redirection:
```tsx
if (role === undefined) {
  router.push("/login");
  return <p>Redirecting...</p>;
}
```

### **3. Centralized Authentication**
Consider using a global authentication context or state management library (e.g., Redux, Context API) to manage user roles and authentication state across the application.

