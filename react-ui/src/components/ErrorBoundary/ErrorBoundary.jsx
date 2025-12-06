import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary component to catch and display React component errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <div
          style={{
            padding: '20px',
            border: '1px solid #dc2626',
            borderRadius: '6px',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: '12px' }}>Something went wrong</h2>
          {this.props.showDetails && this.state.error && (
            <details style={{ marginTop: '12px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>Error details</summary>
              <pre
                style={{
                  padding: '12px',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo && (
                  <>
                    {'\n\n'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
          {this.props.showReset && (
            <button
              onClick={this.handleReset}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  showDetails: PropTypes.bool,
  showReset: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showDetails: process.env.NODE_ENV !== 'production',
  showReset: true,
};

export default ErrorBoundary;

