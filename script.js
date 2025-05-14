import jwt from 'jsonwebtoken';

// Function to generate a JWT with an expiration time
const encrypt = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
};

// Function to verify and handle expired tokens
const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret); // Verify the token
    console.log('Token is valid:', decoded);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired');
    } else {
      console.error('Invalid token:', error.message);
    }
    return null;
  }
};

// Example usage
const payload = { userId: 123, role: 'admin' };
const secret = 'your-secret-key';

const token = encrypt(payload, secret);
console.log('Generated Token:', token);

// Simulate token verification
setTimeout(() => {
  verifyToken(token, secret); // Verify the token after some time
}, 2000); // Adjust the delay to test expiration (e.g., 3600000 ms for 1 hour)

export { encrypt, verifyToken };
