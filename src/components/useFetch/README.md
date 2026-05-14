## useFetch
# Resources and Note :
Used
https://dev.to/techcheck/custom-react-hook-usefetch-eid

 also learned about abortController along the way :
 https://kettanaito.com/blog/dont-sleep-on-abort-controller
 
 also shout out to LLMs they are a big game changers


### Some questions
The Mastery Test
1. The "Signal" Mystery
In your index.jsx, you have the line:
const res = await fetch(url, { signal: controller.signal });
The Question: If I deleted { signal: controller.signal } from that line, but kept the return () => controller.abort() at the bottom, would the fetch still cancel when I type fast? Why or why not?

2. The Reducer Logic
In your Reducer, you have a LOADING case that sets loading: true.
The Question: Why is it important that we also set error: "" inside that same LOADING case? What would happen in the UI if we forgot to clear the error when a new search starts?

3. The Lifecycle Timing
You have fetchData() called inside useEffect.
The Question: If I moved const controller = new AbortController() to the very top of the file (outside the hook entirely), would the app still work correctly for multiple searches?