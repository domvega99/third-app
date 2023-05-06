"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders();
  }, [])

  return (
    <nav className='flex justify-between w-full mb-16 pt-3 px-5'>
      <Link href="/" className='flex gap-2 flex-center'>
        <div className='flex font-semibold'>
          <p className='text-3xl text-indigo-400'>Bloom</p>
          <span className='text-3xl'>lify</span>
        </div>
      </Link>

      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-2'>
            <Link href="/create-prompt" className='bg-black text-white py-2 px-5 rounded-full  hover:bg-white hover:text-black hover:border-black'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='bg-black text-white py-2 px-5 rounded-full hover:bg-white hover:text-black hover:border-black'>
              Sign Out
            </button>
            <Link href="">
              <div className='bg-indigo-400 py-2 px-4 font-bold rounded-full'>
                D
              </div>
            </Link>
          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className=''>
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex gap-2'>
            <Link href="">
              <div className='bg-indigo-400 py-2 px-4 font-bold rounded-full' onClick={() => settoggleDropdown((prev) => !prev)}>
                D 
              </div>
              {toggleDropdown && (
                  <div className='p-5 mt-2 bg-white flex flex-col'>
                    <Link href="/profile" onClick={() => settoggleDropdown(false)} >
                      My Profile
                    </Link>
                    <Link href="/create-prompt"  onClick={() => settoggleDropdown(false)} >
                      Create Prompt
                    </Link>
                    <button type='button' className='bg-black text-white py-2 px-5 rounded-full mt-5 hover:bg-white hover:border-2 hover:text-black hover:border-black' onClick={() => {settoggleDropdown(false); signOut(); }}>
                      Sign Out
                    </button>
                  </div>
                )}
            </Link>
            
          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className=''>
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>      
    </nav>
  )
}

export default Nav