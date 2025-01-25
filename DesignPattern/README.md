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

