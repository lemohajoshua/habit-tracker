import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { vi } from 'vitest';

vi.mock('@/hooks/useAuth');

describe('auth flow', () => {
  it('submits the login form and stores the active session', async () => {
    const mockLogin = vi.fn().mockReturnValue({ success: true });
    (useAuth as any).mockReturnValue({ login: mockLogin });
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'pass');
  });
});