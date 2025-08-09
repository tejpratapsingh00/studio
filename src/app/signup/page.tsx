import { AuthLayout } from '@/components/auth/auth-layout';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-balance text-muted-foreground">
            Join our community and start recycling today
          </p>
        </div>
        <SignupForm />
      </div>
    </AuthLayout>
  );
}
