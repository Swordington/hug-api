/**
 * Copyright (c) 2020 Sword
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

 // Require our dependancies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require("express-rate-limit");

// Setup the Expressjs app & port
const app = express();
const port = process.env.PORT || 8080; // Rever to .example.env for an example

// Rate Limiting
const rateLimiter = rateLimit({
  windowMs: 300000, // 5 minutes
  max: 100 // limit each IP to 100 requests per 5 minutes
});


app.use(cors());// This tells the express app to allow Cross-origin resource sharing (which lets the API function)
app.use(express.json()); // This lets the express app know that all responses and requests should be in a JSON format
app.use(rateLimiter) // This tells the express app how to handle rate limiting, as setup above

// Require & use our hug router, which handles the actual API call
const hugRouter = require('./hug.router');
app.use('/', hugRouter);

// Start up the express app
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });