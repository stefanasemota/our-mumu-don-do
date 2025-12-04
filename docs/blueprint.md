# **App Name**: Mumu No More

## Core Features:

- Weekly Educational Topics: Browse a list of 'Weekly Educational Topics' displayed in a grid.
- Interactive Story Player: An interactive story player (slide deck) that displays an image, text, and audio for each 'page' of the story.
- Admin Authentication: Password-protected admin login using an environment variable and HttpOnly cookie for session management.
- Admin Dashboard: Protected route accessible only with a valid cookie, featuring topic management (create/edit topics with multiple pages).
- Topic Management UI: A UI within the admin dashboard for creating and editing topics, including uploading images and audio, and entering text for multiple pages.
- Gemini-Powered Topic Enhancement: Use the Gemini API tool to provide content suggestions for the story pages based on the selected topic guideline category.
- Firestore Integration: Store weekly educational topics in Firestore with fields for title, date, guidelineCategory, and an array of page objects containing text, imageUrl, and audioUrl.

## Style Guidelines:

- Background: Deep blue-gray (#222F3D) provides a sophisticated backdrop.
- Foreground: Soft off-white (#F5F7FA) ensures readability.
- Primary: Vibrant Blue (#509BF5) highlights key interactive elements.
- Secondary: Muted Dark Blue (#3A4954) for layered elements.
- Headings: 'Playfair' serif font to bring distinction to all headings.
- Body: 'PT Sans' sans-serif font offering a readable, modern typeface.
- Radius: 0.5rem rounding to all cards and buttons to create softness.
- Icons: Crisp and modern icons to match the theme's clarity.