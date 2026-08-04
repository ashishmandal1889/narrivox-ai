import { useState } from 'react';
import { requestJson } from '../api';

export default function OutputPanel({ output, status, tone, thumbnail, thumbnailStatus, onThumbnailChange, onThumbnailStatusChange }) {
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);

  const imageSrc = thumbnail?.base64
    ? `data:${thumbnail.mimeType || 'image/png'};base64,${thumbnail.base64}`
    : null;

  async function handleGenerateThumbnail() {
    if (!prompt.trim()) {
      onThumbnailStatusChange('Write a prompt first before generating a thumbnail.');
      return;
    }

    setBusy(true);
    onThumbnailStatusChange('Narrivox AI is generating a thumbnail preview...');

    try {
      const data = await requestJson('/api/generate-thumbnail', {
        method: 'POST',
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      onThumbnailChange(data.thumbnail);
    } catch (err) {
      onThumbnailStatusChange(err instanceof Error ? err.message : 'Unable to generate thumbnail right now.');
    } finally {
      setBusy(false);
    }
  }

  const thumbPlaceholder = thumbnailStatus || 'Ready for your next idea.';

  return (
    <section className="glass-card output-panel" aria-live="polite">
      <div className="output-header">
        <div className="comic-tab-header">
          <span className="comic-tab-icon">📜</span>
          <span>GENERATED SCRIPT</span>
        </div>
        <div className="status-pill">{status} | {tone}</div>
      </div>

      <div className="thumbnail-panel">
        <div className="thumbnail-header">
          <div className="comic-tab-header compact">
            <span className="comic-tab-icon">🎨</span>
            <span>THUMBNAIL</span>
          </div>
          <button
            type="button"
            className="primary-button"
            disabled={busy}
            onClick={handleGenerateThumbnail}
          >
            {busy ? '\u26A1 Generating...' : '\u26A1 Generate'}
          </button>
        </div>

        <label className="thumbnail-prompt">
          <span>Thumbnail prompt</span>
          <input
            type="text"
            placeholder="e.g. Bold YouTube thumbnail with a shocked face and red arrows pointing at a movie poster"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>

        {imageSrc ? (
          <img src={imageSrc} className="thumbnail-image" alt="Generated YouTube thumbnail preview" />
        ) : (
          <div className="thumbnail-empty">{thumbPlaceholder}</div>
        )}
      </div>

      <pre className="output-card">{output}</pre>
    </section>
  );
}
