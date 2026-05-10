# Luxe Bloom - Supabase Auth Email Templates

Copy and paste these templates into your Supabase Dashboard under **Authentication > Email Templates**.

---

## 1. Confirm Signup
**Subject:** Welcome to Luxe Bloom - Confirm Your Account

```html
<div style="background-color: #FFFDF7; font-family: 'Inter', sans-serif; padding: 40px 20px; color: #1A1A1A;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #F8F5F0;">
    <div style="background-color: #0A5C36; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px;">Luxe Bloom</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #0A5C36; font-family: 'Playfair Display', serif; margin-top: 0;">Welcome to our world of luxury.</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">Thank you for joining Luxe Bloom. To complete your registration and begin your premium shopping experience, please confirm your email address below.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{{ .ConfirmationURL }}" style="background-color: #C9A84C; color: #ffffff; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Confirm My Account</a>
      </div>
      
      <p style="font-size: 14px; color: #9CA3AF; text-align: center;">If the button above doesn't work, copy and paste this link into your browser:<br>
      <span style="word-break: break-all;">{{ .ConfirmationURL }}</span></p>
    </div>
    <div style="padding: 20px; text-align: center; border-top: 1px solid #F8F5F0;">
      <p style="font-size: 12px; color: #9CA3AF; margin: 0;">© 2024 Luxe Bloom. All rights reserved.</p>
    </div>
  </div>
</div>
```

---

## 2. Reset Password
**Subject:** Reset Your Luxe Bloom Password

```html
<div style="background-color: #FFFDF7; font-family: 'Inter', sans-serif; padding: 40px 20px; color: #1A1A1A;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #F8F5F0;">
    <div style="background-color: #0A5C36; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px;">Luxe Bloom</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #0A5C36; font-family: 'Playfair Display', serif; margin-top: 0;">Password Reset Request</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">We received a request to reset the password for your Luxe Bloom account. If you didn't make this request, you can safely ignore this email.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{{ .ConfirmationURL }}" style="background-color: #C9A84C; color: #ffffff; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Reset My Password</a>
      </div>
      
      <p style="font-size: 14px; color: #9CA3AF; text-align: center;">This link will expire shortly for security reasons.</p>
    </div>
    <div style="padding: 20px; text-align: center; border-top: 1px solid #F8F5F0;">
      <p style="font-size: 12px; color: #9CA3AF; margin: 0;">© 2024 Luxe Bloom. All rights reserved.</p>
    </div>
  </div>
</div>
```

---

## 3. Magic Link
**Subject:** Log in to Luxe Bloom

```html
<div style="background-color: #FFFDF7; font-family: 'Inter', sans-serif; padding: 40px 20px; color: #1A1A1A;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #F8F5F0;">
    <div style="background-color: #0A5C36; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px;">Luxe Bloom</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #0A5C36; font-family: 'Playfair Display', serif; margin-top: 0;">Instant Access</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">Click the button below to log in instantly to your Luxe Bloom account. This link is secure and can only be used once.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{{ .ConfirmationURL }}" style="background-color: #0A5C36; color: #ffffff; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Log In Now</a>
      </div>
      
      <p style="font-size: 14px; color: #9CA3AF; text-align: center;">The key to your premium floral destination is just a click away.</p>
    </div>
    <div style="padding: 20px; text-align: center; border-top: 1px solid #F8F5F0;">
      <p style="font-size: 12px; color: #9CA3AF; margin: 0;">© 2024 Luxe Bloom. All rights reserved.</p>
    </div>
  </div>
</div>
```

---

## 4. Change Email Address
**Subject:** Confirm Your New Email Address

```html
<div style="background-color: #FFFDF7; font-family: 'Inter', sans-serif; padding: 40px 20px; color: #1A1A1A;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #F8F5F0;">
    <div style="background-color: #0A5C36; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px;">Luxe Bloom</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #0A5C36; font-family: 'Playfair Display', serif; margin-top: 0;">Confirm Email Change</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4B5563;">You recently requested to change the email associated with your Luxe Bloom account. Please confirm your new email address below.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{{ .ConfirmationURL }}" style="background-color: #C9A84C; color: #ffffff; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Confirm New Email</a>
      </div>
    </div>
    <div style="padding: 20px; text-align: center; border-top: 1px solid #F8F5F0;">
      <p style="font-size: 12px; color: #9CA3AF; margin: 0;">© 2024 Luxe Bloom. All rights reserved.</p>
    </div>
  </div>
</div>
```
