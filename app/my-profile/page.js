'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GoHome } from 'react-icons/go';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import {
  FiUser, FiMail, FiPhone, FiLock,
  FiEye, FiEyeOff, FiCheck, FiX
} from 'react-icons/fi';
import { getMyProfile, changePassword } from '../reducers/AuthSlice';
import { toast } from 'react-toastify';

// ── Field Row ─────────────────────────────────────────────────
const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
      <Icon size={14} className="text-[#ed1c24]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800 break-all">
        {value || <span className="text-gray-300 font-normal">Not provided</span>}
      </p>
    </div>
  </div>
);

// ── Password Field — top-level so focus is never lost ─────────
const PasswordField = ({ label, placeholder, value, show, onChange, onToggle }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none
          focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] text-gray-800 placeholder-gray-300"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
      </button>
    </div>
  </div>
);

// ── Change Password Modal ─────────────────────────────────────
function ChangePasswordModal({ onClose }) {
  const dispatch = useDispatch();
  const { changePasswordLoading } = useSelector((state) => state.auth ?? {});

  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const toggle = (field) => setShow((p) => ({ ...p, [field]: !p[field] }));
  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError('');
    if (!form.current || !form.newPass || !form.confirm) {
      setError('All fields are required.');
      return;
    }
    if (form.newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (form.newPass !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await dispatch(changePassword({
        oldPassword: form.current,
        newPassword: form.newPass,
        confirmPassword: form.confirm,
      })).unwrap();

      setSuccess(true);
      toast.success(res?.message || 'Password changed successfully!');
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err || 'Failed to change password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <FiLock size={14} className="text-[#ed1c24]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Change Password</h3>
              <p className="text-[10px] text-gray-400">Update your account password</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 space-y-4">
          {success ? (
            <div className="flex flex-col items-center py-6 gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck size={22} className="text-green-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800">Password changed successfully!</p>
            </div>
          ) : (
            <>
              <PasswordField
                label="Current Password"
                placeholder="Enter current password"
                value={form.current}
                show={show.current}
                onChange={handleChange('current')}
                onToggle={() => toggle('current')}
              />
              <PasswordField
                label="New Password"
                placeholder="Min. 6 characters"
                value={form.newPass}
                show={show.newPass}
                onChange={handleChange('newPass')}
                onToggle={() => toggle('newPass')}
              />
              <PasswordField
                label="Confirm New Password"
                placeholder="Re-enter new password"
                value={form.confirm}
                show={show.confirm}
                onChange={handleChange('confirm')}
                onToggle={() => toggle('confirm')}
              />

              {error && (
                <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={changePasswordLoading}
                  className="flex-1 py-2.5 rounded-full bg-[#ed1c24] text-white text-sm font-semibold
                    hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {changePasswordLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating…
                    </>
                  ) : 'Update Password'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function MyProfilePage() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { profile, profileLoading } = useSelector((state) => state.auth ?? {});

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const name    = profile?.name ?? profile?.fullName
    ?? [profile?.firstName, profile?.lastName].filter(Boolean).join(' ')
    ?? '—';
  const email   = profile?.email ?? '—';
  const phone   = profile?.phone ?? profile?.phoneNumber ?? profile?.mobile ?? '—';
  const company = profile?.company ?? profile?.companyName ?? null;

  const initials = name !== '—'
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-5 flex justify-between items-center">
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/" passHref>
              <GoHome className="text-[#666666] text-xl" />
            </Link>
          </li>
          <li><MdOutlineArrowForwardIos className="text-[#666666] text-xs" /></li>
          <li className="text-[#ED1C24] text-sm font-medium">My Profile</li>
        </ul>
      </div>

      {/* Loading */}
      {profileLoading && (
        <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex items-center justify-center">
            <p className="text-sm text-gray-400 animate-pulse">Loading profile…</p>
          </div>
        </div>
      )}

      {!profileLoading && (
        <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: Avatar card ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center gap-4">

                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#ed1c24] flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">{initials}</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">{name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{email}</p>
                  {company && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">{company}</p>
                  )}
                </div>

                {/* Change Password button */}
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center justify-center gap-2 border border-[#ed1c24] text-[#ed1c24]
                    hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-sm font-semibold
                    px-4 py-2.5 rounded-full mt-1"
                >
                  <FiLock size={13} />
                  Change Password
                </button>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full text-sm text-gray-500 hover:text-gray-800 font-medium py-1 transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-1">Personal Information</h3>
                <p className="text-xs text-gray-400 mb-4">Your account details</p>

                <ProfileField icon={FiUser}  label="Full Name"     value={name} />
                <ProfileField icon={FiMail}  label="Email Address" value={email} />
                <ProfileField icon={FiPhone} label="Phone Number"  value={phone} />
                {company && (
                  <ProfileField icon={FiUser} label="Company" value={company} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}