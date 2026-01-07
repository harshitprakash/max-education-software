------------------------------------------------------------
## 17. ROUTING & PROTECTED URL RULES (STRICT)
------------------------------------------------------------

This application enforces **route-level access control**.

------------------------------------------------------------
### 17.1 ROUTE CLASSIFICATION
------------------------------------------------------------

Routes are classified into:

1. Public Routes
2. Protected Routes
3. Role-Based Routes

------------------------------------------------------------
### 17.2 PUBLIC ROUTES
------------------------------------------------------------

Allowed:
- Login
- Register
- Forgot password
- Public landing pages

Rules:
- MUST NOT require authentication
- MUST NOT access protected APIs
- MUST NOT assume user identity

------------------------------------------------------------
### 17.3 PROTECTED ROUTES (AUTH REQUIRED)
------------------------------------------------------------

Protected Routes:
- Require authenticated user
- Must verify auth state BEFORE rendering
- Must redirect unauthenticated users

Rules:
- Protected routes MUST be wrapped by a `ProtectedRoute`
- Authentication check MUST be centralized
- UI MUST NOT handle auth validation logic
- No API calls allowed before auth validation

Forbidden ❌:
- Inline auth checks in pages
- Direct token checks in components
- Accessing localStorage in UI components

------------------------------------------------------------
### 17.4 ROLE-BASED ROUTES (RBAC)
------------------------------------------------------------

Role-Based Routes:
- Require authentication AND authorization
- Must verify user role(s) before access

Rules:
- Role checks MUST be declarative
- Roles MUST come from Application state
- Unauthorized access MUST redirect to 403 page

Forbidden ❌:
- Hardcoded role strings
- Role logic in UI components

------------------------------------------------------------
### 17.5 PROTECTED ROUTE IMPLEMENTATION RULES
------------------------------------------------------------

Implementation:
- `ProtectedRoute` MUST live in Application layer
- Auth state MUST come from a hook (e.g. `useAuth`)
- Token handling MUST live in Infrastructure
- Redirect logic MUST be centralized

Allowed:
- `<ProtectedRoute />`
- `<RequireRole />`

Forbidden ❌:
- Conditional routing inside pages
- `if (!token)` checks in components
- Access control inside JSX blocks

------------------------------------------------------------
### 17.6 AUTH FLOW RULES
------------------------------------------------------------

Authentication Flow:
1. Infrastructure retrieves token
2. Application validates auth state
3. UI renders route or redirects

Rules:
- Tokens MUST NOT be decoded in UI
- Expired tokens MUST trigger logout
- Refresh logic MUST be isolated

------------------------------------------------------------
### 17.7 ERROR ROUTES
------------------------------------------------------------

Mandatory routes:
- `/login`
- `/unauthorized` (403)
- `/not-found` (404)

Rules:
- Unauthorized access → `/unauthorized`
- Unauthenticated access → `/login`
- Unknown routes → `/not-found`

------------------------------------------------------------
### 17.8 FORBIDDEN PRACTICES ❌
------------------------------------------------------------

- Token checks in components
- Route protection via `useEffect`
- API calls before auth validation
- Multiple auth sources
- Bypassing ProtectedRoute


------------------------------------------------------------
## 18. JWT & REFRESH TOKEN RULES (STRICT)
------------------------------------------------------------

This application uses **JWT-based authentication with refresh tokens**.

------------------------------------------------------------
### 18.1 TOKEN TYPES
------------------------------------------------------------

Supported tokens:

1. Access Token (short-lived)
2. Refresh Token (long-lived)

Rules:
- Access tokens MUST be short-lived (e.g. 5–15 minutes)
- Refresh tokens MUST be long-lived
- Tokens MUST NEVER be stored in React state

------------------------------------------------------------
### 18.2 TOKEN STORAGE RULES
------------------------------------------------------------

Allowed storage:
- HttpOnly Cookies (preferred)
- Secure Storage abstraction

Forbidden ❌:
- localStorage access in UI
- sessionStorage access in UI
- Storing tokens in Redux/Zustand

Rules:
- Token storage MUST live in Infrastructure layer
- UI MUST NOT know where tokens are stored
- Application layer accesses tokens via abstraction only

------------------------------------------------------------
### 18.3 ACCESS TOKEN USAGE
------------------------------------------------------------

Rules:
- Access token is attached ONLY by API client
- UI MUST NOT manually attach Authorization headers
- Token injection MUST be centralized

Forbidden ❌:
- `Authorization` header in components
- Token parsing in UI
- Token decoding in UI

------------------------------------------------------------
### 18.4 REFRESH TOKEN FLOW
------------------------------------------------------------

Refresh flow:
1. API request fails with 401
2. Infrastructure triggers refresh call
3. New access token issued
4. Original request retried
5. Failure → logout

Rules:
- Refresh MUST be automatic
- Refresh MUST be silent (no UI involvement)
- Multiple refresh calls MUST be deduplicated

Forbidden ❌:
- Manual refresh calls from UI
- Refresh logic in hooks/components
- UI awareness of refresh process

------------------------------------------------------------
### 18.5 LOGOUT RULES
------------------------------------------------------------

Logout MUST:
- Clear access token
- Invalidate refresh token
- Reset application state
- Redirect to `/login`

Rules:
- Logout logic MUST live in Application layer
- Token clearing MUST live in Infrastructure layer

------------------------------------------------------------
### 18.6 SECURITY VIOLATIONS ❌
------------------------------------------------------------

- Logging tokens
- Exposing tokens to UI
- Using refresh token as access token
- Silent refresh loops
- Ignoring refresh failures


------------------------------------------------------------
## 20. AUTH THREAT MODEL & SECURITY GUARANTEES (STRICT)
------------------------------------------------------------

This section defines **non-negotiable security guarantees**
to protect against authentication and authorization threats.

All code MUST comply with these rules.

------------------------------------------------------------
### 20.1 THREAT: TOKEN THEFT
------------------------------------------------------------

Attack:
- Tokens stolen via XSS, localStorage, logs, or UI access

Mitigations (MANDATORY):
- Tokens MUST NOT be stored in localStorage or sessionStorage
- Tokens MUST be HttpOnly cookies or secure storage abstraction
- Tokens MUST NEVER be logged
- UI MUST NOT read or decode tokens

Violation ❌:
- `localStorage.getItem('token')`
- Token access in React components

------------------------------------------------------------
### 20.2 THREAT: SESSION HIJACKING
------------------------------------------------------------

Attack:
- Stolen session reused on another device

Mitigations:
- Tokens MUST be bound to secure cookies
- Cookies MUST use `HttpOnly`, `Secure`, `SameSite`
- Refresh token rotation MUST be enabled
- Logout MUST invalidate refresh tokens

------------------------------------------------------------
### 20.3 THREAT: REPLAY ATTACKS
------------------------------------------------------------

Attack:
- Reusing old access or refresh tokens

Mitigations:
- Access tokens MUST be short-lived
- Refresh tokens MUST be rotated
- Old refresh tokens MUST be invalidated
- Token reuse MUST trigger forced logout

------------------------------------------------------------
### 20.4 THREAT: BROKEN ACCESS CONTROL
------------------------------------------------------------

Attack:
- Accessing protected routes without authorization

Mitigations:
- Server-side route protection is REQUIRED
- Middleware MUST validate auth before rendering
- Role checks MUST be enforced
- UI-only protection is FORBIDDEN

Violation ❌:
- Client-only auth guards
- Hidden buttons as security

------------------------------------------------------------
### 20.5 THREAT: PRIVILEGE ESCALATION
------------------------------------------------------------

Attack:
- User accesses admin functionality

Mitigations:
- Roles MUST be verified server-side
- Role claims MUST be trusted source only
- No role strings in UI
- Admin routes MUST be isolated

------------------------------------------------------------
### 20.6 THREAT: CSRF (Cross-Site Request Forgery)
------------------------------------------------------------

Attack:
- Authenticated user forced to perform actions

Mitigations:
- Auth cookies MUST use SameSite=Lax or Strict
- CSRF tokens REQUIRED for state-changing requests
- Double-submit cookie strategy allowed

------------------------------------------------------------
### 20.7 THREAT: XSS (Cross-Site Scripting)
------------------------------------------------------------

Attack:
- Script injection steals tokens or session

Mitigations:
- No token access in JS
- Content Security Policy (CSP) REQUIRED
- Avoid `dangerouslySetInnerHTML`
- Sanitize user input

------------------------------------------------------------
### 20.8 THREAT: REFRESH TOKEN ABUSE
------------------------------------------------------------

Attack:
- Infinite refresh or silent auth bypass

Mitigations:
- Refresh MUST be rate-limited
- Refresh failures MUST force logout
- Silent refresh loops are FORBIDDEN
- Refresh MUST be server-validated

------------------------------------------------------------
### 20.9 THREAT: AUTH LOGIC BYPASS
------------------------------------------------------------

Attack:
- Skipping auth checks in code

Mitigations:
- Centralized auth enforcement only
- No conditional auth logic in UI
- Middleware enforcement REQUIRED
- Direct route access MUST be blocked

------------------------------------------------------------
### 20.10 THREAT: INFORMATION LEAKAGE
------------------------------------------------------------

Attack:
- Leaking auth or security details

Mitigations:
- Generic error messages in UI
- No stack traces in production
- No auth reason disclosures
- Log only security-safe metadata

------------------------------------------------------------
## FINAL AUTH THREAT MODEL RULE
------------------------------------------------------------

ANY code that weakens authentication or authorization
is a **CRITICAL SECURITY DEFECT**
and MUST be fixed immediately.


