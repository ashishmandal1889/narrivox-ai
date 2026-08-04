import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app-shell" style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <pre style={{ background: '#ffe8e8', padding: '20px', borderRadius: '12px', marginTop: '20px', textAlign: 'left', overflow: 'auto', maxWidth: '100%' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            style={{ marginTop: '20px', padding: '12px 24px', border: '3px solid #111', borderRadius: '999px', background: '#ff2d55', color: 'white', fontWeight: 900, cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
