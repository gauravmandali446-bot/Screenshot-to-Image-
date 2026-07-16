import * as React from 'react';
import { AlertOctagon, RotateCcw, Home, Sparkles } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled exception:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleReturnHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Return a beautiful fallback interface that matches Google design
      return (
        <div 
          className="min-h-screen bg-gray-50/40 flex flex-col items-center justify-center py-16 px-4 font-sans"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-lg text-center space-y-8 animate-scale-up">
            
            {/* Soft Coral Red Warning Accent Icon */}
            <div className="relative inline-flex items-center justify-center p-5 bg-red-50 rounded-full border border-red-100/40">
              <div className="absolute inset-0 bg-red-100/30 rounded-full animate-ping opacity-45"></div>
              <AlertOctagon className="w-10 h-10 text-red-500" aria-hidden="true" />
            </div>

            {/* Error Message Header */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Application Exception
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                An unexpected local error occurred inside the rendering loop. Since we process everything right inside your browser, simple memory anomalies or file layout discrepancies might trigger this.
              </p>
            </div>

            {/* Error Details (Only safe information displayed) */}
            {this.state.error && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-left overflow-auto max-h-32 text-[11px] font-mono text-gray-500">
                <span className="font-bold text-red-600">Error:</span> {this.state.error.message}
              </div>
            )}

            {/* Recovery Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Application</span>
              </button>

              <button
                type="button"
                onClick={this.handleReturnHome}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <Home className="w-4 h-4 text-gray-400" />
                <span>Return Home</span>
              </button>
            </div>

            {/* Helpful reassurance info footer */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Safe local engine: zero uploaded file leaks</span>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
