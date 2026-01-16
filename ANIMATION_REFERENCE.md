# Animation Sequence Reference

## Visual Timeline

```
T=0ms: User clicks "Sign Up" button
┌─────────────────────────────────────┐
│         │                           │
│  LOGIN  │   REGISTER FORM           │
│  FORM   │   [Sign Up] ← clicked     │
│         │                           │
│         │                           │
│  PURPLE │                           │
│  PANEL  │                           │
│         │                           │
└─────────────────────────────────────┘

T=100ms: Panel starts sliding left
┌─────────────────────────────────────┐
│      │                              │
│ LOGI │   REGISTER FORM              │
│ FORM │                              │
│      │                              │
│      │                              │
│ PURP │                              │
│ PANE │                              │
│      │                              │
└─────────────────────────────────────┘

T=300ms: Panel halfway off screen
┌─────────────────────────────────────┐
│                                     │
│      REGISTER FORM                  │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
 PUR... (off screen left)

T=600ms: Panel completely off screen
┌─────────────────────────────────────┐
│                                     │
│      REGISTER FORM                  │
│      (still visible)                │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘

T=600ms: Modal starts appearing (scale 0.8, opacity 0)
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           [tiny modal]              │
│                                     │
│                                     │
└─────────────────────────────────────┘

T=750ms: Modal scaling up (scale 0.9, opacity 0.5)
┌─────────────────────────────────────┐
│                                     │
│       ┌─────────────────┐           │
│       │  Choose Role    │           │
│       │  [S]     [T]    │           │
│       └─────────────────┘           │
└─────────────────────────────────────┘

T=900ms: Modal fully visible (scale 1.0, opacity 1.0)
┌─────────────────────────────────────┐
│   ╔═══════════════════════════╗     │
│   ║   Choose Your Role        ║     │
│   ║                           ║     │
│   ║   ┌─────────┐ ┌─────────┐ ║     │
│   ║   │ Student │ │  Tutor  │ ║     │
│   ║   │   👨‍🎓   │ │   👨‍🏫   │ ║     │
│   ║   └─────────┘ └─────────┘ ║     │
│   ║                           ║     │
│   ║         ✕ Close           ║     │
│   ╚═══════════════════════════╝     │
└─────────────────────────────────────┘

User clicks "Student" card

T=0ms: Card clicked, flip animation starts
┌─────────────────────────────────────┐
│   ╔═══════════════════════════╗     │
│   ║   Choose Your Role        ║     │
│   ║                           ║     │
│   ║   ┌─────────┐ ┌─────────┐ ║     │
│   ║   │•Student•│ │  Tutor  │ ║     │
│   ║   │   👨‍🎓   │ │   👨‍🏫   │ ║     │
│   ║   └─────────┘ └─────────┘ ║     │
│   ╚═══════════════════════════╝     │
└─────────────────────────────────────┘

T=250ms: Modal flipping (rotateY: 45deg)
┌─────────────────────────────────────┐
│   ╔════════════════════╗             │
│   ║  Choose Your Rol   ║             │
│   ║                    ║             │
│   ║   ┌──────┐ ┌──────┐║             │
│   ║   │Stude │ │ Tuto │║             │
│   ║   └──────┘ └──────┘║             │
│   ╚════════════════════╝             │
└─────────────────────────────────────┘
    (3D perspective flip)

T=500ms: Form appears (rotateY: 0deg)
┌─────────────────────────────────────┐
│   ╔═══════════════════════════╗     │
│   ║ ← Student Signup          ║     │
│   ║                           ║     │
│   ║ Full Name: [_________]    ║     │
│   ║ Email:     [_________]    ║     │
│   ║ Password:  [_________]    ║     │
│   ║ Grade:     [▼________]    ║     │
│   ║                           ║     │
│   ║        [Sign Up]          ║     │
│   ╚═══════════════════════════╝     │
└─────────────────────────────────────┘
```

## CSS Transform Values

### Purple Panel States

```css
/* Normal state - Register view (panel on left) */
transform: translateX(0%);

/* Login view (panel on right) */
transform: translateX(100%);

/* Sign up clicked (panel slides off left) */
transform: translateX(-100%);
```

### Modal States

```css
/* Initial (before appearing) */
opacity: 0;
transform: scale(0.8);

/* Animating in */
opacity: 0 → 1;
transform: scale(0.8 → 1.0);

/* Fully visible */
opacity: 1;
transform: scale(1.0);

/* Flip animation (role selected) */
transform: rotateY(0deg → 90deg → 0deg);
```

## Framer Motion Variants

### Modal Container

```typescript
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.8, opacity: 0 }}
transition={{ duration: 0.3 }}
```

### Role Cards View

```typescript
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -50 }}
transition={{ duration: 0.4 }}
```

### Form View

```typescript
initial={{ opacity: 0, x: 50, rotateY: 90 }}
animate={{ opacity: 1, x: 0, rotateY: 0 }}
exit={{ opacity: 0, x: -50, rotateY: -90 }}
transition={{ duration: 0.5 }}
```

### Individual Role Cards (Hover)

```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## Easing Functions

```javascript
// Purple panel slide
cubic-bezier(0.65, 0, 0.35, 1)  // Smooth ease-in-out

// Modal fade/scale
ease  // Default easing

// Opacity transitions
ease-in-out  // Gentle transitions
```

## Animation Properties

| Element | Property | From | To | Duration | Easing |
|---------|----------|------|----|---------:|--------|
| Purple Panel (slide) | translateX | 0% | -100% | 600ms | cubic-bezier(0.65, 0, 0.35, 1) |
| Modal Backdrop | opacity | 0 | 1 | 300ms | ease |
| Modal Container | scale | 0.8 | 1.0 | 300ms | ease |
| Modal Container | opacity | 0 | 1 | 300ms | ease |
| Role Cards (in) | opacity | 0 | 1 | 400ms | ease |
| Role Cards (in) | translateX | 50px | 0 | 400ms | ease |
| Role Cards (out) | opacity | 1 | 0 | 400ms | ease |
| Role Cards (out) | translateX | 0 | -50px | 400ms | ease |
| Form View (in) | opacity | 0 | 1 | 500ms | ease |
| Form View (in) | rotateY | 90deg | 0deg | 500ms | ease |
| Form View (out) | opacity | 1 | 0 | 500ms | ease |
| Form View (out) | rotateY | 0deg | -90deg | 500ms | ease |
| Card Hover | scale | 1.0 | 1.05 | 200ms | ease |
| Card Tap | scale | 1.0 | 0.95 | 100ms | ease |

## Stagger Effect (Future Enhancement)

For a more polished look, you could add stagger to form inputs:

```typescript
// In StudentForm or TutorForm
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>
    {/* Full Name Input */}
  </motion.div>
  <motion.div variants={item}>
    {/* Email Input */}
  </motion.div>
  <motion.div variants={item}>
    {/* Password Input */}
  </motion.div>
</motion.div>
```

## Performance Optimizations

### Hardware Acceleration
```css
transform: translateZ(0);  /* Force GPU acceleration */
backfaceVisibility: hidden; /* Prevent flickering */
```

### Will-change (use sparingly)
```css
.sliding-panel {
  will-change: transform;
}

.modal-container {
  will-change: transform, opacity;
}
```

### Prevent Layout Thrashing
```javascript
// Don't do this:
element.style.transform = 'translateX(-100%)';
const width = element.offsetWidth; // Forces reflow
element.style.opacity = '0';

// Do this:
requestAnimationFrame(() => {
  element.style.transform = 'translateX(-100%)';
  element.style.opacity = '0';
});
```

## Accessibility Considerations

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
```typescript
// Trap focus in modal
useEffect(() => {
  if (isOpen) {
    // Store currently focused element
    const previouslyFocused = document.activeElement;
    
    // Focus first input in modal
    const firstInput = modalRef.current?.querySelector('input');
    firstInput?.focus();
    
    return () => {
      // Restore focus on unmount
      (previouslyFocused as HTMLElement)?.focus();
    };
  }
}, [isOpen]);
```

## Animation Debugging

### Add to components for debugging:

```typescript
// Log animation states
useEffect(() => {
  console.log('Panel sliding:', isPanelSliding);
  console.log('Modal open:', showRoleModal);
  console.log('Selected role:', selectedRole);
}, [isPanelSliding, showRoleModal, selectedRole]);
```

### CSS debugging borders:

```css
/* Add temporarily to see element boundaries */
.auth-container * {
  outline: 1px solid rgba(255, 0, 0, 0.3);
}
```

### Slow down animations for testing:

```typescript
// In auth-container.tsx
setTimeout(() => {
  setShowRoleModal(true)
}, 2000) // Changed from 600ms to 2000ms
```

## Browser DevTools

### Chrome DevTools Animation Panel
1. Open DevTools (F12)
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "Show Animations"
4. Record animations and scrub through timeline

### Performance Profiling
1. Open Performance tab
2. Click Record (Cmd+E)
3. Perform the animation
4. Stop recording
5. Look for long tasks or janky frames

## Common Issues & Solutions

### Issue: Animation stutters
```typescript
// Solution: Use transform instead of position
// Bad:
style={{ left: isOpen ? '0px' : '-400px' }}

// Good:
style={{ transform: `translateX(${isOpen ? '0' : '-100%'})` }}
```

### Issue: Modal appears before panel slides
```typescript
// Solution: Use proper timing
const handleSignUpClick = () => {
  setIsPanelSliding(true)
  // Wait for panel animation to complete
  setTimeout(() => {
    setShowRoleModal(true)
  }, 600) // Match panel animation duration
}
```

### Issue: Flash of content on load
```typescript
// Solution: Prevent initial animation
const [isReady, setIsReady] = useState(false)

useEffect(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setIsReady(true)
    })
  })
}, [])

const transition = isReady ? 'transform 0.6s' : 'none'
```

## Testing Checklist

- [ ] Purple panel slides smoothly left
- [ ] Modal appears after panel is off screen
- [ ] Role cards have hover effect
- [ ] Clicking role triggers flip animation
- [ ] Form appears correctly
- [ ] Back button returns to role selection
- [ ] Esc key closes modal
- [ ] Panel slides back when modal closes
- [ ] No flash of content on page load
- [ ] Smooth on 60fps displays
- [ ] Works on mobile devices
- [ ] Respects prefers-reduced-motion

---

**Pro Tip:** Record your screen and play back in slow motion to verify animation timing!
