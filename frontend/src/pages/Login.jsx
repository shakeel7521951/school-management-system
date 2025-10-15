import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { useLoginMutation } from "../redux/slices/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
export default function Login() {
  const { t } = useTranslation("login"); 
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation()

  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(formData).unwrap();
      dispatch(setProfile(response.user));
      navigate("/")
      toast(response?.message)
    } catch (err) {
      toast.error(err?.data?.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-br from-[#104c80] via-[#0d3a63] to-[#082845] relative overflow-hidden'>
      {/* Background Circles */}
      <div className='absolute w-72 h-72 bg-[#ffffff33] rounded-full blur-3xl top-10 left-10 animate-pulse'></div>
      <div className='absolute w-96 h-96 bg-[#104c8055] rounded-full blur-3xl bottom-10 right-10 animate-pulse'></div>

      {/* Login Card */}
      <div className='w-full max-w-lg backdrop-blur-xl bg-white/20 shadow-2xl rounded-2xl overflow-hidden border border-white/30 relative z-10'>
        {/* Header */}
        <div className='bg-gradient-to-r from-[#104c80]/90 to-[#0d3a63]/90 py-6 px-4 sm:px-8 text-center shadow-md'>
          <h1 className='text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide'>
            {t("card.header.title")}
          </h1>
          <p className='text-white/80 text-sm mt-1'>
            {t("card.header.subtitle")}
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className='p-6 sm:p-8'>
          <div className='grid grid-cols-1 gap-6 mb-6'>
            {/* Email */}
            <div>
              <label className='block text-white font-semibold mb-2'>
                {t("card.form.fields.0.label")}
              </label>
              <div className='relative'>
                <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80' size={18} />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("card.form.fields.0.placeholder")}
                  className='w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none'
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block text-white font-semibold mb-2'>
                {t("card.form.fields.1.label")}
              </label>
              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80' size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("card.form.fields.1.placeholder")}
                  className='w-full pl-10 pr-10 py-2 bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] transition-all duration-200 outline-none'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors'
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right mb-6'>
            <a href={t("card.form.links.forgotPassword")}
              className='text-white hover:text-gray-200 hover:underline text-sm transition-colors'>
              {t("card.form.forgotPasswordText", "Forgot Password?")}
            </a>
          </div>

          {/* Login Button */}
          <div className='flex justify-center'>
            <button
              type='submit'
              disabled={isLoading}
              className='w-[200px] bg-gradient-to-r from-[#104c80] to-[#0d3a63] text-white font-bold py-3 px-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[#104c80]/40 disabled:opacity-50'
            >
              {isLoading ? t("card.form.button.loadingText") : t("card.form.button.text")}
            </button>
          </div>

          {/* Error / Success */}
          {isError && (
            <p className='text-red-400 text-center mt-4'>
              {error?.data?.message || t("card.form.messages.error")}
            </p>
          )}
          {isSuccess && (
            <p className='text-green-400 text-center mt-4'>
              {t("card.form.messages.success")}
            </p>
          )}

          {/* Signup Link */}
          <div className='mt-6 text-center text-white/90'>
            <span>{t("card.form.signupText", "Don't have an account?")}</span>
           <Link to ='/signup'
              className='text-white font-medium hover:text-gray-200 hover:underline transition-colors ml-1'
            >
              {t("card.form.signupButton")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
