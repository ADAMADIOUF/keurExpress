import React, { useState } from 'react'
import { useTranslateTextMutation } from '../slices/contactApiSlice'

const TranslateComponent = () => {
  const [text, setText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('es') // Example: Spanish
  const [translateText, { data, error, isLoading }] = useTranslateTextMutation()

  const handleTranslate = async () => {
    try {
      const response = await translateText({ text, targetLanguage })
      console.log('Translated Text:', response.data.translatedText)
    } catch (err) {
      console.error('Error during translation:', err)
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter text to translate'
      />
      <input
        type='text'
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        placeholder='Target language'
      />
      <button onClick={handleTranslate} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>

      {data && <p>Translated Text: {data.translatedText}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default TranslateComponent
