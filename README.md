# IA Category Specifier

This is a POC for a project that will be used to specify the **category** and **sub-category** of a product based on its title and description.

Both approaches are implemented here in 2 differents components :

- Local model running on the browser
  (using the [`zero-shot-classification` model](https://huggingface.co/spaces/Xenova/zero-shot-classification-demo) from the `@xenova/transformers` package)
- ChatGPT API ("gpt-4.1") with a [prompt](./src/commons/prompt.ts) to classify the text
  (OpenAI API key is required in .env file)

## Usage (edit manually the `App.tsx` file)

```tsx
// App.tsx

function App() {
  return (
    <>
      {/* This will use the local "text classification" model */}
      <OfferForm />
    </>
  );
}
```

```tsx
// App.tsx

function App() {
  return (
    <>
      {/* This will use Chat GPT API */}
      <OfferFormGPT />
    </>
  );
}
```

## Launch the project

```bash
npm install
npm run dev
```

Then navigate to `http://localhost:5173` in your browser.

## Using the ChatGPT API

Copy the `.env.example` file to `.env` and fill the `VITE_OPENAI_API_KEY` variable with your OpenAI API key.

```bash
cp .env.example .env.development.local
```
