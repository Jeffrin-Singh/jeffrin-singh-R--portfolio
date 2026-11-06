# 🤖 Chatbot Setup Guide

This guide walks you through setting up the AI chatbot for your portfolio.

## Prerequisites

- Node.js and npm installed
- Supabase CLI (`supabase`)
- Google Gemini API key

## 1. Install Supabase CLI

```bash
npm install -g supabase
```

Or if you're using Homebrew (macOS):

```bash
brew install supabase
```

## 2. Login to Supabase

```bash
supabase login
```

This will open a browser window for authentication. Follow the prompts.

## 3. Link Your Project

Link your existing Supabase project:

```bash
supabase link --project-ref hvpmyexizyoneahfkrbn
```

When prompted for the database password, press Enter if you don't need it (for Edge Functions, you typically don't).

## 4. Set Environment Variables

Store your Gemini API key as a secret in Supabase:

```bash
supabase secrets set GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Verify it was set:

```bash
supabase secrets list
```

## 5. Deploy the Edge Function

Deploy the chatbot function:

```bash
supabase functions deploy chat
```

You should see output like:

```
✓ Function deployed successfully
✓ Chat function ready at: https://hvpmyexizyoneahfkrbn.supabase.co/functions/v1/chat
```

## 6. Test the Chatbot

1. **Locally:** Open `index.html` in a browser (or run `python -m http.server 8000`)
2. Click the 💬 button in the bottom-right corner
3. Type a message like "What is your experience with AI?" and send
4. You should see a response from the chatbot

If it doesn't work:

- **Check browser console** (F12 → Console) for errors
- **Check Supabase logs:**
  ```bash
  supabase functions logs chat
  ```
- **Verify API key** is set correctly in Supabase secrets

## 7. Deploy to Vercel

Push your changes to GitHub:

```bash
git add .
git commit -m "feat: add AI chatbot widget"
git push origin main
```

Vercel will automatically redeploy your site. The chatbot will work on the live site once the Edge Function is deployed to Supabase.

## Customization

### Change the Chatbot's Personality

Edit `supabase/functions/chat/index.ts` and modify the `SYSTEM_PROMPT` constant to change what the chatbot knows about you.

### Change the Model

Edit the `MODELS` list. Models are tried in order, and the next one is used if a model is busy, slow (over `MODEL_TIMEOUT_MS`) or retired:

```typescript
const MODELS = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-flash-latest"];
```

Lite models reply in about a second. Bigger models can be slow or overloaded, so keep a lite model first.

### Adjust Response Length

Change `maxOutputTokens` in the `generationConfig` (current: 500):

```typescript
generationConfig: {
    maxOutputTokens: 1000,  // Longer responses
    temperature: 0.7,
}
```

### Change Widget Position

Edit `.chatbot-widget` CSS in `index.html`:

```css
.chatbot-widget {
    bottom: 1.5rem;    /* Change to top, left, etc. */
    right: 1.5rem;
}
```

## Troubleshooting

### Function returns 404

- Verify the Edge Function is deployed: `supabase functions list`
- Check the project URL in `index.html` matches your Supabase project

### "API key not configured"

- Run `supabase secrets list` to verify `GEMINI_API_KEY` is set
- Re-deploy the function after setting the secret:
  ```bash
  supabase functions deploy chat
  ```

### Chatbot returns generic error

- Check Supabase logs: `supabase functions logs chat`
- Verify your Gemini API key is valid
- Check your Gemini API quota hasn't been exceeded

### CORS errors in browser console

- This is expected in local development if not using a proper server
- Use `python -m http.server 8000` to run locally
- It will work fine once deployed to Vercel + Supabase

## Cost Considerations

- **Supabase:** Edge Functions have a generous free tier
- **Gemini API:** Check your usage at [Google AI Studio](https://aistudio.google.com/)
- Monitor costs if your portfolio gets high traffic

## Next Steps

- Customize the chatbot's knowledge in `SYSTEM_PROMPT`
- Add analytics to track user interactions
- Implement rate limiting for production use
- Consider upgrading to a more capable model as needed

## Support

For issues:

- Supabase docs: https://supabase.com/docs
- Gemini API docs: https://ai.google.dev/docs
- Check browser console (F12) for detailed error messages
