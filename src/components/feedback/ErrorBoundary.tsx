import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-(--radius-lg) bg-danger-bg text-danger-400">
            <AlertOctagon className="size-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">An unexpected error occurred</p>
            <p className="mt-1 max-w-md text-xs text-text-secondary">
              {this.state.error?.message ?? 'The application encountered an unrecoverable error.'}
            </p>
          </div>
          <Button size="sm" onClick={this.handleReset}>
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
