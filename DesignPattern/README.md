
# Design Patterns in React and JavaScript

## 1. Higher-Order Component (HOC) for Loading State

### Overview:
`withLoading` is a Higher-Order Component that adds a loading state to any wrapped component. It displays a `FullScreenLoader` when `isLoading` is true.

### Benefits:
- **Separation of Concerns**: Keeps loading logic separate from the core component.
- **Reusability**: Can be applied to multiple components.
- **Customizable**: Easily modify the loading indicator.

### Example:
```javascript
const withLoading = (WrappedComponent) => ({ isLoading, ...props }) =>
  isLoading ? <FullScreenLoader /> : <WrappedComponent {...props} />;
```

---

## 2. Content Management Factory Pattern

### Overview:
Implements the Factory Pattern to create and manage different content types (e.g., Blog, Service, Quote) with encapsulated logic.

### Key Components:
- **Factory Class**: Determines the type and creates content instances.
- **Base Class**: Shared properties and methods for all content types.
- **Specific Content Types**: Extend the base class (e.g., `BlogContent`, `ServiceContent`).

### Example:
```javascript
class ContentFactory {
  createContent(type, title, description, image) {
    if (type === 'blog') return new BlogContent(title, description, image);
    if (type === 'service') return new ServiceContent(title, description, image);
    // Add more types as needed.
  }
}
```

---

## 3. React Button Decorator Pattern

### Overview:
Uses the Decorator Pattern to enhance button functionality dynamically, such as adding disabled states or conditional styling.

### Benefits:
- **Modular Enhancements**: Keeps buttons flexible and reusable.
- **Dynamic Behavior**: Extend behavior without modifying core logic.

### Example:
```javascript
const DecoratorPatternForDisablingBtn = (OriginalButton) => ({ isDisabled, ...props }) =>
  <OriginalButton disabled={isDisabled} style={{ opacity: isDisabled ? 0.5 : 1 }} {...props} />;
```

---

## 4. Specific Route Protection Guard Pattern

### Overview:
Protects routes in a React/Next.js application based on user roles. Redirects unauthorized users to a login page.

### Key Features:
- Role-based access control.
- Centralized protection logic in a reusable component.

### Example:
```javascript
export default function SpecificRouteProtection({ children, role }) {
  const router = useRouter();
  if (!role) {
    router.push('/login');
    return null;
  }
  return <>{children}</>;
}
```

---

## 5. React Context API Pattern

### Overview:
Manages global state across an application with React's Context API.

### Key Components:
- **Context Provider**: Encapsulates shared states and logic.
- **Custom Hook**: Simplifies access to context values.

### Example:
```javascript
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = { chat: false, userProfile: false, notification: false };
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider value={{ isClicked, handleClick }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
```

---

## Advantages of These Patterns:
- **Modularity**: Each pattern isolates specific concerns.
- **Reusability**: Components and logic can be reused across projects.
- **Scalability**: Easily extend patterns to meet evolving requirements.
- **Maintainability**: Centralized and structured codebase.

These patterns provide robust solutions for common development challenges, making applications clean, scalable, and efficient.