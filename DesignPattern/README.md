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


