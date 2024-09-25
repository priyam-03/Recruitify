import storage from "redux-persist/lib/storage"; // Import the default localStorage

// Define expiration duration in milliseconds (e.g., 1 hour)
const EXPIRATION_DURATION = 5 * 24 * 60 * 60 * 1000; // 1 hour

export const customStorage = {
  async getItem(key) {
    const value = await storage.getItem(key);
    if (!value) return null;

    const parsedValue = JSON.parse(value);
    const currentTime = Date.now();

    // Check if the persisted state has expired
    if (
      parsedValue?.timestamp &&
      currentTime - parsedValue.timestamp > EXPIRATION_DURATION
    ) {
      // If expired, remove the item from localStorage
      await storage.removeItem(key);
      return null; // Return null as if the state doesn't exist
    }

    return JSON.stringify(parsedValue.state); // Return the stored state if it's not expired
  },

  async setItem(key, value) {
    const newValue = JSON.stringify({
      state: JSON.parse(value), // Save the Redux state
      timestamp: Date.now(), // Save the current timestamp
    });
    await storage.setItem(key, newValue);
  },

  async removeItem(key) {
    await storage.removeItem(key);
  },
};
