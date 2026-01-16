# Sign Up Flow Implementation

## Overview
This implementation provides an animated, multi-step sign-up flow with role selection (Student/Tutor) and role-specific forms.

## Components

### 1. **AuthContainer** (`components/auth/auth-container.tsx`)
The main container component that orchestrates the authentication flow.

**Key Features:**
- Purple sliding panel animation
- Smooth transitions between login and register views
- Integration with role selector modal
- Responsive design (mobile & desktop)

**New States Added:**
- `showRoleModal`: Controls visibility of the role selector modal
- `isPanelSliding`: Tracks the purple panel slide-off animation

**Key Handlers:**
- `handleSignUpClick()`: Triggered when "Sign Up" button is clicked
  - Slides purple panel off to the left (-100%)
  - Shows role selector modal after 600ms delay
- `handleCloseModal()`: Closes modal and slides panel back in

### 2. **RegisterForm** (`components/auth/register-form.tsx`)
Updated to trigger the role selection flow.

**Props:**
- `onSignUpClick?: () => void` - Callback when Sign Up button is clicked

**Behavior:**
- When form is submitted, calls `onSignUpClick` instead of directly handling registration
- This triggers the purple panel animation and opens the role selector

### 3. **RoleSelectorModal** (`components/auth/role-selector-modal.tsx`)
Modal dialog that presents role cards and role-specific forms.

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback to close the modal

**Features:**
- Backdrop overlay with click-to-close
- Two role cards: Student and Tutor
- Card flip/expand animation when role is selected
- Keyboard accessibility (Esc to close, focus trap)
- Smooth transitions using Framer Motion

**Animations:**
- Modal entrance: scale from 0.8 to 1.0
- Role cards: hover scale effect
- Form transition: flip animation (rotateY)

### 4. **StudentForm** (`components/auth/student-form.tsx`)
Form for student registration.

**Required Fields:**
- Full Name
- Email
- Password (min 8 characters)
- Grade (dropdown)

**Features:**
- Client-side validation
- Password visibility toggle
- Error messages for invalid inputs
- Loading state during submission
- API call to `/api/auth/signup` with role: "student"
- Redirects to `/complete-profile` on success

### 5. **TutorForm** (`components/auth/tutor-form.tsx`)
Form for tutor registration.

**Required Fields:**
- Full Name
- Email
- Password (min 8 characters)
- Subjects (comma-separated)
- Years of Experience

**Features:**
- Client-side validation
- Password visibility toggle
- Error messages for invalid inputs
- Loading state during submission
- API call to `/api/auth/signup` with role: "tutor"
- Subjects parsed as array, yearsExperience as number
- Redirects to `/complete-profile` on success

## Animation Flow

### Step 1: Initial State (Register Page)
- Purple panel is on the left side (translateX: 0%)
- Register form visible on the right side

### Step 2: Sign Up Button Clicked
- `handleSignUpClick()` is called
- `isPanelSliding` set to `true`
- Purple panel slides off to the left (translateX: -100%)
- Animation duration: 600ms with cubic-bezier easing

### Step 3: Role Selector Appears
- After 600ms delay, `showRoleModal` set to `true`
- Modal fades in with scale animation (0.8 → 1.0)
- Backdrop appears with fade-in
- Two role cards displayed (Student & Tutor)

### Step 4: Role Selection
- User clicks Student or Tutor card
- Card animation triggers
- Modal content flips/expands (rotateY animation)
- Role-specific form appears

### Step 5: Form Submission
- User fills and submits form
- Client-side validation runs
- POST request to `/api/auth/signup`
- On success: redirect to `/complete-profile`
- On error: display error message

### Step 6: Modal Close (if user presses Esc or back)
- `handleCloseModal()` is called
- Modal fades out
- Purple panel slides back in (translateX: 0%)

## Technology Stack

- **React** - Component framework
- **Next.js** - App router, navigation
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Keyboard Accessibility

### Focus Trap
The modal implements a focus trap to keep keyboard navigation within the modal when open.

### Keyboard Shortcuts
- **Esc**: 
  - If on role selection screen → Close modal
  - If on form screen → Go back to role selection
- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter**: Submit form or select role

## API Integration

### Endpoint: `/api/auth/signup`

**Method:** POST

**Request Body (Student):**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "grade": "10",
  "role": "student"
}
```

**Request Body (Tutor):**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepassword",
  "subjects": ["Math", "Physics", "Chemistry"],
  "yearsExperience": 5,
  "role": "tutor"
}
```

**Success Response:**
- Status: 200
- Action: Redirect to `/complete-profile`

**Error Response:**
- Status: 4xx/5xx
- Action: Display error message

## Validation Rules

### All Forms
- **Email**: Must be valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Password**: Minimum 8 characters
- **Full Name**: Required, non-empty

### Student Specific
- **Grade**: Must select a grade from dropdown

### Tutor Specific
- **Subjects**: Required, comma-separated string (parsed to array)
- **Years of Experience**: Required, numeric value

## Responsive Design

### Desktop (≥768px)
- Split-screen layout
- Sliding purple panel
- Forms on left/right sides
- Modal centered on screen

### Mobile (<768px)
- Full-screen forms
- No sliding panel
- Modal takes full width with padding
- Stacked layout for role cards

## CSS Classes Reference

### Custom Classes (in globals.css)
```css
/* Show mobile view below 768px */
.auth-mobile-view {
  display: flex;
}

@media (min-width: 768px) {
  .auth-mobile-view {
    display: none !important;
  }
}

/* Show desktop view above 768px */
.auth-desktop-view {
  display: none;
}

@media (min-width: 768px) {
  .auth-desktop-view {
    display: block !important;
  }
}
```

## Installation & Setup

### Prerequisites
All dependencies are already installed in the project:
- framer-motion: ^12.23.26
- lucide-react: ^0.454.0
- next: latest
- react: latest

### File Structure
```
components/auth/
├── auth-container.tsx       # Main container (UPDATED)
├── register-form.tsx        # Register form (UPDATED)
├── role-selector-modal.tsx  # Role selector modal
├── student-form.tsx         # Student signup form
├── tutor-form.tsx           # Tutor signup form
└── login-form.tsx          # Login form (unchanged)

app/
├── register/
│   └── page.tsx            # Register page route
└── login/
    └── page.tsx            # Login page route
```

## Integration with v0 or Other Projects

### Option 1: Use Existing Structure
The components are already integrated. Just navigate to:
- `/register` - Shows register page with animated flow
- `/login` - Shows login page

### Option 2: Standalone Integration

1. **Copy Components:**
   ```
   components/auth/auth-container.tsx
   components/auth/register-form.tsx
   components/auth/role-selector-modal.tsx
   components/auth/student-form.tsx
   components/auth/tutor-form.tsx
   ```

2. **Add to Your Page:**
   ```tsx
   import { AuthContainer } from "@/components/auth/auth-container"
   
   export default function RegisterPage() {
     return <AuthContainer />
   }
   ```

3. **Add CSS Classes:** (in your global CSS file)
   ```css
   .auth-mobile-view {
     display: flex;
   }
   
   @media (min-width: 768px) {
     .auth-mobile-view {
       display: none !important;
     }
   }
   
   .auth-desktop-view {
     display: none;
   }
   
   @media (min-width: 768px) {
     .auth-desktop-view {
       display: block !important;
     }
   }
   ```

4. **Create API Endpoint:** (`app/api/auth/signup/route.ts`)
   ```typescript
   import { NextResponse } from 'next/server'
   
   export async function POST(request: Request) {
     try {
       const body = await request.json()
       const { fullName, email, password, role, ...roleSpecificData } = body
       
       // Your signup logic here
       // - Hash password
       // - Save to database
       // - Create session/token
       
       return NextResponse.json({ success: true })
     } catch (error) {
       return NextResponse.json(
         { error: 'Signup failed' },
         { status: 500 }
       )
     }
   }
   ```

5. **Create Complete Profile Page:** (`app/complete-profile/page.tsx`)
   ```tsx
   export default function CompleteProfilePage() {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <h1>Complete Your Profile</h1>
         {/* Your profile completion form */}
       </div>
     )
   }
   ```

## Customization Guide

### Change Colors
Update the gradient in `auth-container.tsx`:
```tsx
// Current: Purple to Pink
className="... bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 ..."

// Example: Blue to Teal
className="... bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 ..."
```

### Change Animation Duration
In `auth-container.tsx`:
```tsx
// Current: 600ms
setTimeout(() => {
  setShowRoleModal(true)
}, 600)

// Change to 400ms for faster animation
setTimeout(() => {
  setShowRoleModal(true)
}, 400)
```

### Add More Roles
In `role-selector-modal.tsx`, add more cards:
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => handleRoleSelect("parent")}
  className="..."
>
  {/* Parent card content */}
</motion.button>
```

### Modify Form Fields
Edit `student-form.tsx` or `tutor-form.tsx` to add/remove fields:
```tsx
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  // Add your custom field
  customField: "",
})
```

## Troubleshooting

### Purple panel doesn't slide off
- Check that `isPanelSliding` state is being set correctly
- Verify transform CSS is being applied: `translateX(-100%)`
- Check browser console for JavaScript errors

### Modal doesn't appear
- Verify `showRoleModal` is being set to `true`
- Check that Framer Motion is installed: `npm list framer-motion`
- Ensure z-index is high enough (currently z-50)

### Forms don't submit
- Check browser console for validation errors
- Verify API endpoint `/api/auth/signup` exists
- Check network tab for request/response

### Animations are jerky
- Ensure hardware acceleration is enabled: `transform: translateZ(0)`
- Check `backfaceVisibility: hidden` is applied
- Verify CSS transitions are enabled after first paint

## Performance Considerations

### Hardware Acceleration
All animated elements use `transform: translateZ(0)` to trigger GPU acceleration.

### Prevent Initial Animation
The `isReady` state prevents animations on initial page load:
```tsx
const getTransition = (duration: string) => 
  isReady ? `opacity ${duration} ease-in-out, transform ${duration} ease-in-out` : "none"
```

### Efficient Re-renders
- Components use React.memo where appropriate
- State updates are batched
- Callbacks use useCallback to prevent unnecessary re-renders

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support (responsive design)

## Future Enhancements

1. **Email Verification:** Add email verification step after signup
2. **Social Auth:** Integrate Google/Facebook OAuth
3. **Progressive Disclosure:** Add tooltip hints for form fields
4. **Animations Library:** Create reusable animation presets
5. **Accessibility:** Add ARIA labels and screen reader support
6. **Analytics:** Track conversion rates for each role
7. **A/B Testing:** Test different animation timings
8. **Form Auto-save:** Save draft form data to localStorage

## License

This implementation follows your project's license.

## Support

For issues or questions about this implementation, please refer to the component files for inline documentation and comments.
