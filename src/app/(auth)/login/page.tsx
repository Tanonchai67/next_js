"use client";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        let body = {
            identifier: identifier,
            password: password
        }
        const res = await fetchActionApi("/api/auth/local", {
            method: "POST",
            body: JSON.stringify(body)
        }
        )
        if (res) {
            if (res.status == 200) {
                window.location.href = '/our-team';
                console.log(res)
            }else{
                alert("อีเมล์หรือรหัสผ่านไม่ถูกต้อง!")
                console.log(res)
            }
        }
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        การเข้าสู่ระบบ
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => login(e)}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อีเมล์</label>
                            <input type="email" name="identifier" id="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                                required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                            <input type="password" name="password" id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">เข้าสู่ระบบ</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            คุณยังไม่มีบัญชีใช่ไหม? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">สมัครสมาชิก</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}