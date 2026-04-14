# 1) REST API Integration Patterns
REST API Integration Patterns refers to the structured way of connecting a frontend application (such as React) with a backend server to exchange data using HTTP requests and responses.

The frontend sends requests to specific API endpoints, and the server returns data, usually in **JSON format**, which is then used to update the UI dynamically.

---

## Important HTTP Methods
- **GET** → Fetch data from the server
- **POST** → Send new data to the server
- **PUT** → Update existing data
- **DELETE** → Remove data from the server

---

## Common Integration Flow
1. Frontend sends request to API endpoint
2. Server processes the request
3. Response is returned in JSON format
4. UI updates with the received data

---

## Important REST API Integration Patterns

### 1. Fetch on Component Load
Use `useEffect()` to call the API when the component loads.

Example use case:
- Dashboard data
- User profile
- Product listing page

---

### 2. CRUD Operations
CRUD stands for:
- **Create**
- **Read**
- **Update**
- **Delete**

This is the most common real-world integration pattern.

---

### 3. Loading State Handling
Always show a loading message or spinner while data is being fetched.

Example:
- “Loading data...”

This improves user experience.

---

### 4. Error Handling
Use `try...catch` to handle:
- Network errors
- Server errors
- Invalid responses

This makes the application more reliable.

---

### 5. Reusable API Service Pattern
Create a separate file such as `api.js` or `services/api.js` to keep API logic separate from UI components.

Benefits:
- Clean code
- Reusability
- Easy maintenance

---

### 6. Async/Await Pattern
Use `async/await` for cleaner and more readable asynchronous code.

It makes API calls easier to understand compared to chained promises.

---

# 2) Axios Interceptors

## Deep Theory
Axios Interceptors are functions that allow us to **intercept requests and responses before they are handled by `then()` or `catch()`**.

They are mainly used for:
- Adding authentication tokens
- Modifying request headers
- Logging API requests
- Handling global errors
- Refreshing expired tokens

Interceptors help in applying **common logic globally** for all API calls.

---

## Types of Interceptors

### 1. Request Interceptor
A request interceptor runs **before the API request is sent to the server**.

#### Common Uses
- Add `Authorization` token
- Set common headers
- Log request details

#### Syntax
```javascript
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

2. Response Interceptor

A response interceptor runs after the server sends the response but before it reaches the component.

Common Uses
Handle success responses
Handle errors globally
Redirect on unauthorized access
Syntax
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("API Error:", error);
    return Promise.reject(error);
  }
);


# 3) Global Error Boundaries

Global Error Boundaries are a React feature used to **catch JavaScript errors anywhere in the component tree** and display a fallback UI instead of crashing the entire application.

They help improve application stability and user experience by handling unexpected runtime errors gracefully.

---

##  Use of Error Boundaries :
- Prevent app crash
- Show fallback UI
- Log errors for debugging
- Improve user experience
- Handle unexpected component errors globally

---

##  Working :
An Error Boundary catches errors in:
- Child components
- Lifecycle methods
- Render methods

It does **not** catch errors in:
- Event handlers
- Async code (`setTimeout`, API calls)
- Server-side rendering
- Errors inside itself

---

## Syntax
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

# 4) Debouncing & Throttling API Calls
Debouncing and Throttling are optimization techniques used to **control how frequently API calls are made**, especially during user interactions like typing, scrolling, resizing, and clicking.

These techniques help improve:
- Performance
- User experience
- Server efficiency
- Reduced unnecessary API requests

---

## 1. Debouncing -
Debouncing means **delaying the API call until the user stops typing or interacting for a specified time**.

It is mainly used in:
- Search bars
- Auto-suggestion inputs
- Form validation

###  Working :
If the debounce delay is `500ms`, the API request will be sent **only after the user stops typing for 500 milliseconds**.

### Syntax
```javascript
const debounceSearch = debounce((value) => {
  fetchData(value);
}, 500);
Benefit

Prevents multiple API calls on every keystroke.

2. Throttling -

Throttling means limiting the API call to execute only once in a fixed time interval, even if the event is triggered multiple times.

It is mainly used in:

Scroll events
Window resize
Repeated button clicks
How It Works

If the throttle time is 1000ms, the API call runs only once every 1 second.

Syntax
const throttleScroll = throttle(() => {
  fetchMoreData();
}, 1000);
Benefit

Ensures controlled and regular API requests.

Key Difference
Debouncing → Executes after the user stops action
Throttling → Executes at fixed intervals during action

Real-World Use Cases
Search suggestions → Debouncing
Infinite scroll → Throttling
Resize event → Throttling
Input validation → Debouncing


# 5) React Query Fundamentals

React Query is a powerful library used to **fetch, cache, synchronize, and update server state in React applications**.

It simplifies API data handling by managing:
- Data fetching
- Caching
- Background updates
- Loading states
- Error states
- Automatic refetching

React Query helps reduce the need for manual `useEffect`, `useState`, and complex API logic.

---

##  Use of React Query -
- Simplifies API calls
- Built-in caching
- Automatic background refetch
- Easy loading and error handling
- Better performance
- Server state management

---

## Core Concepts

### 1) `useQuery`
Used to **fetch data from an API**.

### Syntax
```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});
Benefit

Automatically handles:

Loading state
Error state
Cached data
2) useMutation

Used to create, update, or delete data.

Syntax
const mutation = useMutation({
  mutationFn: addUser
});
Benefit

Best for:

POST
PUT
DELETE requests
3) Caching

React Query stores fetched data in cache.

If the same query is called again, it returns cached data instead of making a new API call.

This improves performance.

4) Automatic Refetching

It can automatically refetch data:

On window focus
On reconnect
At intervals

This keeps UI data fresh.

5) Query Client Setup
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
