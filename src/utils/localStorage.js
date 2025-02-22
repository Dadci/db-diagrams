
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('shcemaState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('shcemaState', serializedState);
    } catch (err) {
      // Ignore write errors
      console.log('Error saving state:', err);
    }
  };