import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Listen for errors
    this.client.on('error', (err) => {
      console.error(`Redis client error: ${err}`);
    });

    // Promisify Redis client methods for async usage
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * Check if the Redis client is alive.
   * @returns {boolean} - True if Redis client is connected, else false.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Get a value from Redis by key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<string | null>} - The value associated with the key, or null if not found.
   */
  async get(key) {
    return this.getAsync(key);
  }

  /**
   * Set a value in Redis with an expiration time.
   * @param {string} key - The key to set the value for.
   * @param {string | number} value - The value to set.
   * @param {number} duration - The expiration time in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  /**
   * Delete a key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>}
   */
  async del(key) {
    await this.delAsync(key);
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
