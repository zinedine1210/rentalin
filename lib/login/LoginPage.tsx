// app/login/page.tsx
'use client';

import { useState } from 'react';
import { ApiResponse, tryLogin } from '@@/src/hooks/CollectionAPI';
import { ResponseData } from '@@/src/types/apitypes';
import { Notify } from '@@/src/utils/script';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InputText from '@@/app/components/Input/InputText';
import InputPassword from '@@/app/components/Input/InputPassword';

export default function LoginPage() {
  const [value, setValue] = useState({ 
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const payload = {
      username: email,
      password: pass
    }

    if (step == 1) {
      setStep(2);
      setLoading(false);
      document.getElementById("authpassword").focus();
      return false;
    }

    const result: ApiResponse<any> = await tryLogin(payload)
    if(result.success){
      Notify(result.message, 'info', 5000)
      setLoading(false)
      setTimeout(() => {
        router.push('/admin')
      }, 2000);
    }else{
      setLoading(false)
      Notify(result.message, 'error')
    }
  };

  
  return (
    <section className="flex items-center justify-center w-full h-screen">
        <div className="">
          <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
            <div className="flex justify-center mx-auto">
              <Image src={"/images/static-LP/logobeyondtech.png"} width={400} height={200} alt='Beyond Tech' />
            </div>
            <div className="w-full max-w-md mx-auto mt-6">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div
                  className={`${
                    step == 1
                      ? "translate-x-0 opacity-100"
                      : "translate-x-20 sr-only opacity-0"
                  } transition-all`}
                >
                  <InputText
                    id="authemail"
                    name='authemail'
                    value={email}
                    onChange={value => setEmail(value)}
                    placeholder='Enter your email'
                    label='Username'
                    required={false}
                  />
                </div>
                <div
                  className={`${
                    step == 2
                      ? "translate-x-0 opacity-100"
                      : "translate-x-20 sr-only opacity-0"
                  } transition-all`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="authpassword"
                      className="block text-sm text-zinc-800 font-bold dark:text-zinc-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-zinc-600 dark:text-zinc-400 hover:underline"
                    >
                      Forget Password?
                    </a>
                  </div>

                  <InputPassword
                    id="authpassword"
                    name='authpassword'
                    value={pass}
                    onChange={value => setPass(value)}
                    placeholder='Enter your password'
                    required={false}
                  />
                  {/* <div>
                      <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">Password</label>
                      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>
                  <a href="#" className="inline-block mt-4 text-blue-500 capitalize hover:underline dark:text-blue-400">
                      reset password?
                  </a> */}
                </div>

                { loading ? (
                  <div role="status" className="w-full text-center py-5">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 text-center mx-auto"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`${
                        step == 2 ? "" : "hidden"
                      } w-2/5 px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50`}
                    >
                      {"Cancel"}
                    </button>
                    <button
                      type="submit"
                      className={`${
                        step == 1 ? "w-full" : "w-3/5"
                      } px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
                    >
                      “Continue”
                    </button>
                  </div>
                )}
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Don’t have an account yet? Sign up
                  </a>
                </div>

                {/* <div className="flex items-center mt-6">
                  <input
                    id="link-checkbox"
                    onChange={(e) => setRemember(e.target.checked)}
                    checked={remember}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember Me
                  </label>
                </div> */}

                <p className="mt-6 text-zinc-500 dark:text-zinc-400">
                  By clicking “Continue” above, you acknowledge that you have
                  read and understood, and agree to Our{" "}
                  <a href="#" className="text-zinc-700 dark:text-white">
                    Term & Conditions
                  </a>
                  and
                  <a href="#" className="text-zinc-700 dark:text-white">
                    {" "}
                    Privacy Policy.
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
