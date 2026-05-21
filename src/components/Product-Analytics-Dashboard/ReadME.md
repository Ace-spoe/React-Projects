# Product Analytics Dashboard

## 📌 Project Overview
 high-performance product dashboard that filters, sorts, and compares  products. Built to master React performance optimization hooks (useMemo, useCallback, React.memo) and custom hooks patterns.


 ## 🧠 Key Concepts 
 ### 1. useMemo - For Expensive Calculations
 When to use: Filtering large arrays, expensive calculations, derived state.

 When NOT to use: Simple calculations, values that change on every render

 ### 2. useCallback - For Stable Function References
 Why needed: Prevents child components (wrapped in React.memo) from re-rendering unnecessarily.
  pattern: useCallback + React.memo work together.

  ### 3. React.memo - Skip Unnecessary Re-renders
  Critical: For React.memo to work, all functions passed as props MUST be wrapped in useCallback.

  Also React.Memo fails for non-primitive data types cause it comapres the reference since new objectRefand arrayRef is craeted every render , React.memo fails

  ### 4. useReducer - Clean State Management
  Reinforcing useReducer better than useState when: Multiple related states, complex state transitions, logic spans many event handlers

  ```javaScript 
  // Copy before mutate
const sorted = [...array].sort((a,b) => a.price - b.price);

// State with prev (always fresh)
setList(prev => [...prev, newItem]);

// Dynamic object keys
const obj = {};
obj[dynamicKey] = value;// for Dynamic key use obj[varName]

// Loop through object
Object.entries(obj).map(([key, val]) => <div>{key}: {val}</div>);

// Conditional rendering
{isLoading ? <Loader /> : <Content />}  ```

### 4. Performance.now() for Measuring Render Time
```javaScript 
const start = performance.now();
// code to measure
const end = performance.now();
console.log(`Took ${end - start} ms`);
```
###   Reminders 
forEach() executes a function for each element but returns undefined. map() returns a new array

 Arrow functions with {} need return. Arrow functions with () have implicit return. DON'T FORGET , {hrs of debugging just to see I removed return by mistake :(
 }

 sort(), reverse(), splice() mutate the original array. Always use spread operator [...array] to copy before mutating. Keep that in mind

 useMemo is NOT for returning jsx , Did that first time working with with useMemo 

 Handle Empty States if not your program crash for example map() wont work on an empty array 

## 📚 Resources That Helped
 LLM (GPT ,gemini , deepseek)

 [useMemo](https://dev.to/ayako_yk/exploring-usememo-in-react-optimization-and-real-world-applications-5djp)

[useCallBack](https://dev.to/alserembani/lets-talk-about-hooks-part-3-usecallback-and-useref-2b0d#section-2)

 [Both](https://medium.com/@umaishassan/what-the-heck-is-memo-usememo-and-usecallback-in-react-3b1dc12665ad) - Very good start with this

Also React Documentation but after having some idea
