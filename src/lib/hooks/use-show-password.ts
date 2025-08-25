import { useState } from 'react';

export default function useShowPassword() {
  const [showPassword, setShowPassWord] = useState('password');

  function toggleVisiblity(type: string) {
    setShowPassWord(type);
  }
  return { showPassword, toggleVisiblity };
}
