'use client';

import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showValidation?: boolean;
}

export function AuthInput({
  label,
  type = 'text',
  error,
  showValidation,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const isPassword = type === 'password';
  const hasValue = props.value && String(props.value).length > 0;

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`
            w-full px-4 py-3.5 rounded-2xl border transition-all
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
            }
            outline-none bg-white
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {showValidation && hasValue && !error && !isPassword && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 px-1">{error}</p>
      )}
    </div>
  );
}
