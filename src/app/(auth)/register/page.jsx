'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { BookOpen, Mail, Lock, User, Loader2, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicUrl: '',
    });
    const [formErrors, setFormErrors] = useState({
        fields: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));
        if (name === 'password' || name === 'confirmPassword') {
            setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) {
            if (profilePicPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(profilePicPreview);
            }
            setProfilePic(null);
            setProfilePicPreview('');
            return;
        }

        if (profilePicPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(profilePicPreview);
        }

        setFormData(prev => ({ ...prev, profilePicUrl: '' }));
        setProfilePic(file);
        setProfilePicPreview(URL.createObjectURL(file));
    };

    const handleProfilePicUrlChange = (e) => {
        const url = e.target.value;

        if (profilePicPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(profilePicPreview);
        }

        setProfilePic(null);
        setProfilePicPreview(url);
        setFormData(prev => ({ ...prev, profilePicUrl: url }));
    };

    const validatePassword = (password) => {
        const results = [];

        if (password.length < 6) {
            results.push('at least 6 characters');
        }

        if (!/[A-Z]/.test(password)) {
            results.push('one uppercase letter');
        }

        if (!/[a-z]/.test(password)) {
            results.push('one lowercase letter');
        }

        return results;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormErrors({ fields: '', password: '', confirmPassword: '' });

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setFormErrors(prev => ({ ...prev, fields: 'Please fill in all fields' }));
            toast.error('Please fill in all fields');
            return;
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length) {
            setFormErrors(prev => ({
                ...prev,
                password: `Password must contain ${passwordErrors.join(', ')}.`,
            }));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return;
        }

        const defaultProfileImage = 'https://i.ibb.co.com/qLqCp0Lb/S-A-Mahamud.png';
        let profileImageString;
        if (profilePic) {
            profileImageString = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(profilePic);
            });
        } else if (formData.profilePicUrl.trim()) {
            profileImageString = formData.profilePicUrl.trim();
        } else {
            profileImageString = defaultProfileImage;
        }

        setLoading(true);
        try {
            const { data, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: profileImageString,
                callbackURL: '/'
            });

            if (error) {
                toast.error(error.message || 'Registration failed');
                return;
            }

            if (data) {
                toast.success('Account created successfully!');
                router.push('/');
            }
        } catch (err) {
            toast.error('An error occurred during registration');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/'
            });
        } catch (err) {
            toast.error('Google sign up failed');
            console.error(err);
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-8 shadow-2xl shadow-slate-950/50">
                    {/* Logo & Heading */}
                    <div className="mb-8">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg shadow-blue-500/20">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-white">StudyNook</span>
                        </Link>
                        <h1 className="text-3xl font-black text-white mb-2">Join StudyNook</h1>
                        <p className="text-slate-400">Create your account and start booking study rooms</p>
                    </div>

                    {/* Google Sign Up */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        {googleLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Signing up...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                                </svg>
                                <span>Sign up with Google</span>
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-950 text-slate-500">or sign up with email</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-4 mb-6">
                        {formErrors.fields ? (
                            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
                                {formErrors.fields}
                            </div>
                        ) : null}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                                Full name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="profilePic" className="block text-sm font-semibold text-slate-300 mb-2">
                                Profile picture
                            </label>
                            <input
                                id="profilePic"
                                name="profilePic"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                className="w-full text-xs file:mr-4 file:rounded-full file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-slate-200 file:shadow-sm file:ring-1 file:ring-inset file:ring-white/10 text-slate-300 placeholder:text-slate-500"
                            />
                            <p className="text-xs text-slate-500 mt-1">Optional: upload a photo or paste a picture link below.</p>
                            <input
                                id="profilePicUrl"
                                name="profilePicUrl"
                                type="url"
                                value={formData.profilePicUrl}
                                onChange={handleProfilePicUrlChange}
                                placeholder="https://example.com/photo.jpg"
                                className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                            />
                            {profilePicPreview ? (
                                <div className="mt-3 flex items-center gap-3">
                                    <img
                                        src={profilePicPreview}
                                        alt="Profile preview"
                                        className="h-14 w-14 rounded-full object-cover border border-white/10"
                                    />
                                    <span className="text-sm text-slate-300">Preview selected image</span>
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-11 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                                />
                                {formData.password ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                ) : null}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Must be at least 6 characters and include one uppercase letter and one lowercase letter.
                            </p>
                            {formErrors.password ? (
                                <p className="text-xs text-rose-400 mt-2">{formErrors.password}</p>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-300 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                                />
                            </div>
                            {formErrors.confirmPassword ? (
                                <p className="text-xs text-rose-400 mt-2">{formErrors.confirmPassword}</p>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create account</span>
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 text-center text-slate-400 text-sm">
                    <p>By signing up, you agree to our{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
