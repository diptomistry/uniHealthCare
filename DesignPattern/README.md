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

## Future Improvements
- Add property validation.
- Enhance error reporting and logging.
- Support custom configurations.
```

This concise version covers the essentials while remaining clear. Let me know if further adjustments are needed!


