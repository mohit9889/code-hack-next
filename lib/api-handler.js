import dbConnect from './mongodb';
import { ZodError } from 'zod';

/**
 * Higher-order function to wrap API handlers with error handling and DB connection.
 * @param {object} handlerObj - Object mapping HTTP methods to async functions (e.g., { GET: async (req, res) => ... })
 */
export function apiHandler(handlerObj) {
  return async (req, res) => {
    // Ensure DB is connected
    try {
      await dbConnect();
    } catch (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const start = Date.now();
    const method = req.method;

    // Check if the method is supported
    if (!handlerObj[method]) {
      res.setHeader('Allow', Object.keys(handlerObj));
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }

    try {
      // Execute the handler for the specific method
      await handlerObj[method](req, res);
    } catch (err) {
      console.error(`Error in API route ${req.url} [${method}]:`, err);

      // Handle Zod validation errors
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          errors: err.errors,
        });
      }

      // Handle generic errors
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
      return res.status(statusCode).json({ message });
    }
  };
}
