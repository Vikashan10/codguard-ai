import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as healthApi from './api/health';

describe('App component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders CODGuard header and subtitle', async () => {
    vi.spyOn(healthApi, 'fetchHealthStatus').mockResolvedValueOnce({
      status: 'ok',
      service: 'codguard-api',
    });

    render(<App />);

    expect(screen.getByText('CODGuard')).toBeInTheDocument();
    expect(screen.getByText('AI-powered COD delivery assurance')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Connected')).toBeInTheDocument());
  });

  it('displays Connected when health check succeeds', async () => {
    vi.spyOn(healthApi, 'fetchHealthStatus').mockResolvedValueOnce({
      status: 'ok',
      service: 'codguard-api',
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
      expect(screen.getByText('codguard-api')).toBeInTheDocument();
    });
  });

  it('displays Unavailable when health check fails', async () => {
    vi.spyOn(healthApi, 'fetchHealthStatus').mockRejectedValueOnce(
      new Error('Network Error')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  });
});
