# Design Patterns Guide

## Color System
We use CSS variables for all colors to maintain consistency across themes and make it easier to implement dark/light mode switches. Our color system is defined in the root and can be accessed throughout the application.

### Color Variables
```css
:root {
  --primary-color: #color;
  --secondary-color: #color;
  --background-color: #color;
  --text-color: #color;
  /* Additional theme colors */
}
```

## Minimalist Design
Our design philosophy emphasizes simplicity and clarity:
- Clean layouts with proper spacing
- Limited color palette
- Typography hierarchy
- Essential elements only
- Whitespace utilization

## CSS Hover States
Para mantener un código más limpio y organizado, implementamos los estados hover dentro de la clase usando el selector `&:hover`. Ejemplo:

```css
.button {
  background: var(--primary-color);
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-hover-color);
  }
}
```

## Border Radius
We maintain consistent border-radius throughout the application for visual harmony:
- Buttons, cards, and containers use standardized border-radius
- Border-radius values are also stored in CSS variables for consistency

## Theming System
- All components must use theme variables
- Colors should adapt to both light and dark themes
- Transitions should be smooth when switching themes
- New components must be tested in all theme variants

## Component Guidelines
- Use existing color variables
- Maintain consistent spacing
- Follow minimalist principles
- Ensure theme compatibility
- Use standard border-radius values

## Best Practices
- Always use CSS variables instead of hardcoded values
- Test components in all theme modes
- Maintain visual consistency with existing elements
- Follow the established minimalist approach
- Use proper spacing and alignment

