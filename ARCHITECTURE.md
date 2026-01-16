# Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       AuthContainer                              │
│  (Main orchestrator with purple panel animation)                │
│                                                                   │
│  State:                                                           │
│    • isLogin: boolean (login vs register view)                   │
│    • showRoleModal: boolean (modal visibility)                   │
│    • isPanelSliding: boolean (panel slide-off state)             │
│                                                                   │
│  ┌─────────────────┐                  ┌─────────────────┐       │
│  │   LoginForm     │                  │  RegisterForm   │       │
│  │  (Left side)    │                  │  (Right side)   │       │
│  └─────────────────┘                  └────────┬────────┘       │
│                                                 │                │
│  ┌───────────────────────────────┐             │                │
│  │   Purple Sliding Panel        │             │                │
│  │   • Normal: translateX(0/100%)│             │                │
│  │   • Sliding: translateX(-100%)│             │                │
│  └───────────────────────────────┘             │                │
│                                                 │                │
│                                    onSignUpClick() triggers:    │
│                                    1. isPanelSliding = true     │
│                                    2. After 600ms:              │
│                                       showRoleModal = true      │
└─────────────────────────────────────────┬───────────────────────┘
                                          │
                                          │
                    ┌─────────────────────▼────────────────────┐
                    │      RoleSelectorModal                    │
                    │  (Centered overlay with backdrop)         │
                    │                                           │
                    │  Props: isOpen, onClose                   │
                    │  State: selectedRole ("student"|"tutor")  │
                    │                                           │
                    │  ┌─────────────────────────────────────┐ │
                    │  │  Role Selection View                │ │
                    │  │  ┌──────────┐    ┌──────────┐      │ │
                    │  │  │ Student  │    │  Tutor   │      │ │
                    │  │  │   👨‍🎓   │    │   👨‍🏫   │      │ │
                    │  │  │  Card    │    │  Card    │      │ │
                    │  │  └────┬─────┘    └────┬─────┘      │ │
                    │  │       │               │             │ │
                    │  └───────┼───────────────┼─────────────┘ │
                    │          │               │               │
                    │    onClick()       onClick()             │
                    │          │               │               │
                    │  ┌───────▼───────────────▼─────────────┐ │
                    │  │  Form View (Flip Animation)         │ │
                    │  │                                      │ │
                    │  │  if selectedRole === "student":     │ │
                    │  │  ┌────────────────────────────────┐ │ │
                    │  │  │      StudentForm               │ │ │
                    │  │  │  • fullName                    │ │ │
                    │  │  │  • email                       │ │ │
                    │  │  │  • password                    │ │ │
                    │  │  │  • grade (select)              │ │ │
                    │  │  │                                │ │ │
                    │  │  │  [Submit] → /api/auth/signup   │ │ │
                    │  │  └────────────────────────────────┘ │ │
                    │  │                                      │ │
                    │  │  if selectedRole === "tutor":       │ │
                    │  │  ┌────────────────────────────────┐ │ │
                    │  │  │      TutorForm                 │ │ │
                    │  │  │  • fullName                    │ │ │
                    │  │  │  • email                       │ │ │
                    │  │  │  • password                    │ │ │
                    │  │  │  • subjects (text)             │ │ │
                    │  │  │  • yearsExperience (number)    │ │ │
                    │  │  │                                │ │ │
                    │  │  │  [Submit] → /api/auth/signup   │ │ │
                    │  │  └────────────────────────────────┘ │ │
                    │  │                                      │ │
                    │  └──────────────────────────────────────┘ │
                    └───────────────────────────────────────────┘
```

## Data Flow

### 1. Initial Render
```
User visits /register
  ↓
AuthContainer renders
  ↓
RegisterForm displayed on right side
Purple panel on left side (translateX: 0%)
```

### 2. Sign Up Click
```
User clicks "Sign Up" button in RegisterForm
  ↓
handleSubmit() in RegisterForm
  ↓
onSignUpClick() prop called
  ↓
handleSignUpClick() in AuthContainer
  ↓
setIsPanelSliding(true)
  ↓
Purple panel animates: translateX(-100%) [600ms]
  ↓
setTimeout 600ms
  ↓
setShowRoleModal(true)
  ↓
RoleSelectorModal appears (fade + scale animation)
```

### 3. Role Selection
```
User clicks "Student" or "Tutor" card
  ↓
handleRoleSelect(role) in RoleSelectorModal
  ↓
setSelectedRole(role)
  ↓
Modal content flips (rotateY animation) [500ms]
  ↓
StudentForm or TutorForm renders
```

### 4. Form Submission
```
User fills form fields
  ↓
User clicks "Submit"
  ↓
handleSubmit() in StudentForm/TutorForm
  ↓
validateForm() - check all required fields
  ↓
If valid:
  ↓
  fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      role: 'student' | 'tutor'
    })
  })
  ↓
  If response.ok:
    ↓
    router.push('/complete-profile')
  Else:
    ↓
    Display error message
```

### 5. Modal Close (Esc or Back)
```
User presses Esc or clicks "← Back"
  ↓
handleCloseModal() in AuthContainer
  ↓
setShowRoleModal(false)
  ↓
Modal fades out [300ms]
  ↓
setTimeout 300ms
  ↓
setIsPanelSliding(false)
  ↓
Purple panel slides back: translateX(0%)
```

## State Management

```typescript
// AuthContainer
const [isLogin, setIsLogin] = useState(true)        // login vs register view
const [isAnimating, setIsAnimating] = useState(false) // transition lock
const [showRoleModal, setShowRoleModal] = useState(false) // modal visibility
const [isPanelSliding, setIsPanelSliding] = useState(false) // panel animation
const [isReady, setIsReady] = useState(false)       // prevent initial animation

// RoleSelectorModal
const [selectedRole, setSelectedRole] = useState<Role>(null) // selected role
const [isFlipping, setIsFlipping] = useState(false) // flip animation state

// StudentForm / TutorForm
const [formData, setFormData] = useState({...})     // form field values
const [errors, setErrors] = useState<Record<string, string>>({}) // validation errors
const [isLoading, setIsLoading] = useState(false)   // submission state
const [showPassword, setShowPassword] = useState(false) // password visibility
```

## Props Flow

```
AuthContainer
│
├─→ LoginForm (no props)
│
├─→ RegisterForm
│   └── onSignUpClick: () => handleSignUpClick()
│
└─→ RoleSelectorModal
    ├── isOpen: showRoleModal
    └── onClose: () => handleCloseModal()
    │
    ├─→ StudentForm (when selectedRole === "student")
    │   └── onBack: () => setSelectedRole(null)
    │
    └─→ TutorForm (when selectedRole === "tutor")
        └── onBack: () => setSelectedRole(null)
```

## CSS Classes Hierarchy

```
.auth-container (AuthContainer root)
  ├── .auth-mobile-view (mobile: flex, desktop: hidden)
  │   ├── .login-form (absolute, opacity transition)
  │   └── .register-form (absolute, opacity transition)
  │
  └── .auth-desktop-view (mobile: hidden, desktop: block)
      ├── .form-section (w-1/2, left & right)
      │   ├── LoginForm
      │   └── RegisterForm
      │
      └── .sliding-panel (w-1/2, purple gradient)
          ├── transform: translateX(0% | 100% | -100%)
          └── transition: 600ms cubic-bezier

.role-selector-modal (fixed overlay)
  ├── .backdrop (bg-black/40)
  └── .modal-container (centered, max-w-2xl)
      ├── .role-cards (grid-cols-2)
      │   ├── Student card
      │   └── Tutor card
      │
      └── .form-view (flip animation)
          ├── StudentForm
          └── TutorForm
```

## Animation Timing

```
Action                          Duration    Easing
─────────────────────────────────────────────────────
Panel slide (normal toggle)    600ms       cubic-bezier(0.65, 0, 0.35, 1)
Panel slide-off (sign up)       600ms       cubic-bezier(0.65, 0, 0.35, 1)
Modal fade in                   300ms       ease
Modal scale                     300ms       ease
Role card hover                 200ms       ease
Form flip (rotateY)             500ms       ease
Opacity transitions             300-400ms   ease-in-out
```

## Validation Flow

```
StudentForm Validation:
  ├─ fullName: required, non-empty
  ├─ email: required, valid email format
  ├─ password: required, min 8 characters
  └─ grade: required, must select option

TutorForm Validation:
  ├─ fullName: required, non-empty
  ├─ email: required, valid email format
  ├─ password: required, min 8 characters
  ├─ subjects: required, comma-separated (parsed to array)
  └─ yearsExperience: required, numeric value
```

## API Contract

```typescript
// Request
POST /api/auth/signup
Content-Type: application/json

// Student Body
{
  fullName: string
  email: string
  password: string
  grade: string
  role: "student"
}

// Tutor Body
{
  fullName: string
  email: string
  password: string
  subjects: string[]          // parsed from comma-separated
  yearsExperience: number     // parsed from string
  role: "tutor"
}

// Success Response
200 OK
{ success: true }

// Error Response
400/500
{ error: string }
```

## Event Handlers Summary

| Handler | Location | Trigger | Action |
|---------|----------|---------|--------|
| `handleToggle()` | AuthContainer | "Sign In" button | Toggle between login/register views |
| `handleSignUpClick()` | AuthContainer | "Sign Up" button | Slide panel, show modal |
| `handleCloseModal()` | AuthContainer | Esc key or close | Hide modal, slide panel back |
| `handleRoleSelect()` | RoleSelectorModal | Role card click | Show role-specific form |
| `handleBack()` | RoleSelectorModal | "← Back" button | Return to role selection |
| `handleSubmit()` | StudentForm/TutorForm | Form submit | Validate & POST to API |
| `handleChange()` | StudentForm/TutorForm | Input change | Update formData, clear errors |

## File Dependencies

```
auth-container.tsx
  ├── imports: LoginForm, RegisterForm, RoleSelectorModal
  ├── uses: Next.js router, pathname
  └── exports: AuthContainer

register-form.tsx
  ├── imports: Icons from lucide-react
  ├── receives: onSignUpClick prop
  └── exports: RegisterForm

role-selector-modal.tsx
  ├── imports: StudentForm, TutorForm, framer-motion
  ├── receives: isOpen, onClose props
  └── exports: RoleSelectorModal

student-form.tsx
  ├── imports: Icons, framer-motion, Next.js router
  ├── receives: onBack prop
  └── exports: StudentForm

tutor-form.tsx
  ├── imports: Icons, framer-motion, Next.js router
  ├── receives: onBack prop
  └── exports: TutorForm
```

---

This architecture ensures:
- ✅ Separation of concerns (container vs presentation)
- ✅ Unidirectional data flow (props down, events up)
- ✅ Reusable components (forms can be used elsewhere)
- ✅ Type safety (TypeScript interfaces)
- ✅ Maintainability (clear state management)
