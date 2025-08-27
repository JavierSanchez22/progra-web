# **TASK MANAGER**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Doppler](https://img.shields.io/badge/doppler-663399?style=for-the-badge&logo=doppler&logoColor=white)

If you want to check out the **```TASK MANAGER```** application, [**Click Here**](https://d2fz9q0k4f74rt.cloudfront.net/index.html)
<br>

![](./docs/Task-Manager.png)

## Hooks used in this proyect:
### 1. useState:
Use state is a React Hook, that allows add state to functional components, this hook return an array with two elemts: the current state value and a function to update it
<br> 

**Why use it?**
* I used it for TaskForm, to handle the status of the name of the task the user is typing (taskName)
* In App to manage the status of the active filter
* And use in useLocalStorage to manage the status of the sotred value and the loading status

<br>

**Where use it? (example)**
```javascript
const [taskName, setTaskName] = useState('');
const [filter, setFilter] = useState('all');
```
### 2. useEffect:
useEffect is a React Hook that runs code after the component renders, allowing you to handle side effects like API calls, subscriptions, or resource cleanup.
<br> 

**Why use it?**
* I used it in useLocalStorage (two times), in load initial value and to save in localStorage

<br>

**Where use it? (example)**
```javascript
// Load value
useEffect(() => {
  const item = window.localStorage.getItem(key);
  if (item) {
    setStoredValue(JSON.parse(item));
  }
  setIsLoaded(true);
}, [key]);

// Save value
useEffect(() => {
  if (isLoaded) {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }
}, [key, storedValue, isLoaded]);
```
### 3. Custom Hook, useLocalStorage
This Hook is my cutom Hook, to synchronize the state of React with the browser's local storage (localStorage) combinate with useState and useEffect
<br>

**Why use it?**
* Data persistance as tasks are maintained between user session
* Automatic Sync as each change in state is automatically saved to localStorage

<br>

**Where use it? (example)**
```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // load from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null && item !== 'undefined' && item !== 'null') {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // save in local storage when change value
  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [key, storedValue, isLoaded]);

  return [storedValue, setStoredValue];
}
```

### 4. Hooks in main component
**HomeWork Status**
```javascript
const [tasks, setTasks] = useLocalStorage('tasks', []);
```
*task is a key under wich data is stored in localStorage and [] is a initial value if there is no previously save data*
<br><br>

**Filter Status**
```javascript
const [filter, setFilter] = useState('all');
```
*all is a initial value (show all tasks)*
