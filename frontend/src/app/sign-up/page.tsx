'use client'

import { useState } from 'react'
import Link from 'next/link'

import { AiOutlineGoogle } from 'react-icons/ai'

import { Divider } from '@mui/material'

import { Login } from '@/services/authorization_state'

import { Footer, IconButton } from '@/components'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    await Login(email, password)
  }

  return (
    <main className="w-[90%] mx-auto sm:w-full sm:px-12 pt-48">
      <h3 className="text-3xl font-bold text-center text-white/90 mb-16">Sign Up</h3>

      <section className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl p-10 rounded-md mb-20">
        <p className="text-white/80 mb-8">¿No tienes una cuenta de FingWatch?</p>

        {/* Sign In with Google */}
        <IconButton
          Icon={AiOutlineGoogle}
          text="Sign Up with Google"
          iconSize={24}
          textSize="md"
          className="w-full bg-white/10 justify-center p-3 rounded-md mb-4 hover:bg-white/20 transition-colors"
        />

        <span className="block text-xs text-center text-white/50 mb-4">OR</span>

        {/* Sign In with Email and Password */}
        <form className="mb-8">
          <input
            type="email"
            className="w-full bg-white/10 text-white/80 border border-white/0 px-4 py-3 rounded-md mb-4 focus:outline-none focus:border-white/10 placeholder:text-white/40 transition-colors"
            placeholder="Email address"
            value={email}
            onChange={(args) => setEmail(args.target.value)}
          />
          <input
            type="password"
            className="w-full bg-white/10 text-white/80 border border-white/0 px-4 py-3 rounded-md mb-4 focus:outline-none focus:border-white/10 placeholder:text-white/40 transition-colors"
            placeholder="Password"
            value={password}
            onChange={(args) => setPassword(args.target.value)}
          />
          <input
            type="password"
            className="w-full bg-white/10 text-white/80 border border-white/0 px-4 py-3 rounded-md mb-6 focus:outline-none focus:border-white/10 placeholder:text-white/40 transition-colors"
            placeholder="Repeat Password"
          />

          <button
            type="button"
            className="bg-white/10 text-white/80 font-bold px-12 py-3 rounded-md hover:bg-white/20 hover:text-white transition-colors"
            onClick={() => signUp()}
          >
            Sign Up
          </button>
        </form>

        <Divider color="#3b3b3b" />

        <div className="flex items-center gap-4 mt-8">
          <p className="text-white/80">¿Ya tienes una cuenta?</p>
          <Link
            href="/sign-in"
            className="text-white/80 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
