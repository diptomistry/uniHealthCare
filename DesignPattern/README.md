# Design Pattern Presentation Slide
https://www.overleaf.com/read/rmybdpbtpjzm#617bf5
# Backend Design Patterns - University HealthCare Project

This document outlines the key design patterns implemented in the backend of the University HealthCare project. These patterns were chosen to ensure modularity, scalability, and adherence to modern software engineering principles.

## Table of Contents

1. [Introduction](#introduction)
2. [Design Patterns Overview](#design-patterns-overview)
   - [Singleton Pattern](#singleton-pattern)
   - [Template Pattern](#template-pattern)
   - [Factory Pattern](#factory-pattern)
   - [Builder Pattern](#builder-pattern)
3. [How to Use](#how-to-use)
4. [Benefits](#benefits)

---

## Introduction

The backend of the University HealthCare project is built using **Spring Boot** to deliver a secure, scalable, and maintainable platform. Key features include role-based functionalities, seamless user management, and efficient duty assignment workflows. To achieve these, the following design patterns were utilized:

- **Singleton Pattern**: For centralized configuration management.
- **Template Pattern**: To streamline workflows like duty assignments.
- **Factory Pattern**: For dynamic user role creation.
- **Builder Pattern**: To simplify complex object creation processes.

---

## Design Patterns Overview

### Singleton Pattern

#### Use Case: Mail Configuration

The **Singleton Pattern** is implemented in the `MailConfig` class to ensure a single, globally accessible instance of the `JavaMailSender`. This guarantees consistent and efficient email-sending functionality across the application.

#### Key Features:

- The `javaMailSender` bean is defined as a singleton using the `@Bean` annotation in the `MailConfig` class.
- SMTP settings, authentication, and connection properties are centralized.

#### Code Example:
```java
@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.example.com");
        mailSender.setPort(587);
        mailSender.setUsername("your-email@example.com");
        mailSender.setPassword("your-password");
        
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
```

---

### Template Pattern

#### Use Case: Duty Assignment

The **Template Pattern** is used to define the skeleton of the duty assignment process. Specific rules for assignment (e.g., team-based or shift-based) are implemented in subclasses.

#### Key Features:

- The abstract class includes methods for common steps such as validation, logging, and notifications.
- Subclasses implement specific duty assignment logic.

#### Code Example:
```java
public abstract class DutyAssignmentTemplate {

    public final void assignDuty() {
        validateAvailability();
        assignShiftOrTeam();
        notifyUsers();
    }

    protected abstract void validateAvailability();
    protected abstract void assignShiftOrTeam();

    private void notifyUsers() {
        System.out.println("Notifying users of their assignments...");
    }
}

public class ShiftBasedAssignment extends DutyAssignmentTemplate {
    @Override
    protected void validateAvailability() {
        System.out.println("Validating user availability for shift...");
    }

    @Override
    protected void assignShiftOrTeam() {
        System.out.println("Assigning users to shifts...");
    }
}
```

---

### Factory Pattern

#### Use Case: User Creation Service

The **Factory Pattern** is implemented to dynamically create user objects based on roles such as `Admin`, `Doctor`, `Student`, and `Teacher`.

#### Key Features:

- Encapsulation of role-specific logic simplifies the addition of new roles.
- Centralized user creation logic ensures consistency.

#### Code Example:
```java
public class UserFactory {

    public static User createUser(String role) {
        switch (role.toLowerCase()) {
            case "doctor":
                return new DoctorUser();
            case "student":
                return new StudentUser();
            case "admin":
                return new AdminUser();
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}

public abstract class User {
    protected String role;
    public abstract void performRoleSpecificAction();
}

public class DoctorUser extends User {
    public DoctorUser() {
        this.role = "Doctor";
    }

    @Override
    public void performRoleSpecificAction() {
        System.out.println("Performing doctor-specific actions...");
    }
}
```

---

### Builder Pattern

#### Use Case: User Object Creation

The **Builder Pattern** is applied for creating complex `User` objects with optional and mandatory fields, making object construction more flexible and readable.

#### Key Features:

- Eliminates the need for multiple constructors.
- Ensures only valid `User` objects are created.

#### Code Example:
```java
public class User {
    private final Integer userID;
    private final String password;
    private final String email;
    private final String name;
    private final String status;
    private final String role;

    private User(Builder builder) {
        this.userID = builder.userID;
        this.password = builder.password;
        this.email = builder.email;
        this.name = builder.name;
        this.status = builder.status;
        this.role = builder.role;
    }

    public static class Builder {
        private Integer userID;
        private String password;
        private String email;
        private String name;
        private String status = "Pending";
        private String role;

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
```

---

## How to Use

1. **Singleton Pattern**: Modify `MailConfig` with your SMTP credentials to enable email sending.
2. **Template Pattern**: Extend the `DutyAssignmentTemplate` class to implement new duty assignment rules.
3. **Factory Pattern**: Add new subclasses to handle additional roles and update the `UserFactory` logic accordingly.
4. **Builder Pattern**: Use the `User.Builder` class to construct `User` objects with the required attributes.

---

## Benefits

- **Singleton Pattern**: Centralizes configuration, ensuring consistency and resource optimization.
- **Template Pattern**: Promotes code reuse and flexibility for complex workflows.
- **Factory Pattern**: Simplifies dynamic object creation, reducing redundancy.
- **Builder Pattern**: Enhances object creation with flexibility and error-proof mechanisms.

---

By leveraging these design patterns, the University HealthCare backend achieves a high level of maintainability and scalability, enabling future enhancements with minimal refactoring.


# Design Patterns in Frontend(React and JavaScript):


This section explains design patterns used in the frontend of the University HealthCare project. These patterns enhance modularity, reusability, and scalability.

## Table of Contents

1. [Higher-Order Component (HOC) for Loading State](#1-higher-order-component-hoc-for-loading-state)  
2. [Content Management Factory Pattern](#2-content-management-factory-pattern)  
3. [React Button Decorator Pattern](#3-react-button-decorator-pattern)  
4. [Specific Route Protection Guard Pattern](#4-specific-route-protection-guard-pattern)  
5. [React Context API Pattern](#5-react-context-api-pattern)  
6. [Advantages of These Patterns](#advantages-of-these-patterns)

---
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