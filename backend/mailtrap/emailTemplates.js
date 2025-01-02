export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007bff;
    }
    p {
      line-height: 1.5;
    }
    .verification-code {
      font-weight: bold;
      font-size: 18px;
      color: #007bff;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Verify Your Email</h1>
    <p>Thank you for signing up! Please use the code below to verify your email address:</p>
    <p class="verification-code">{verificationCode}</p>
    <p>If you didn’t sign up, you can safely ignore this email.</p>
  </div>
</body>
</html>
`

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007bff;
    }
    p {
      line-height: 1.5;
    }
    a {
      display: inline-block;
      padding: 10px 15px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
    a:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Password Reset</h1>
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    <a href="{resetURL}">Reset Password</a>
    <p>If you didn’t request this, you can safely ignore this email.</p>
  </div>
</body>
</html>
`

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #28a745;
    }
    p {
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Password Reset Successful</h1>
    <p>Your password has been successfully reset. You can now log in with your new password.</p>
    <p>If you didn’t request this change, please contact our support team immediately.</p>
  </div>
</body>
</html>
`
