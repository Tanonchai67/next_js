"use client";
import Input from "@/app/components/material/input";
import { fetchActionApi, setAccessToken } from "@/app/utils/action";
import bcrypt from 'bcryptjs';
import { useState } from "react";
import Swal from 'sweetalert2';

interface LoginResponse {
    jwt: string;
    user: {
        id: number;
        documentId: number;
    }
}

const hashPassword = async (identifier: string, password: string) => {
    const salt = await bcrypt.genSalt(10); // สร้าง Salt สำหรับการเข้ารหัส
    const hashedIdentifer = await bcrypt.hash(identifier, salt);
    const hashedPassword = await bcrypt.hash(password, salt); // เข้ารหัสรหัสผ่าน
    const hashUser = hashedIdentifer + ":" + hashedPassword
    return hashUser;
};

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
        } as any);

        if (res) {
            if (res.status == 200) {
                const token = res.data as LoginResponse
                await setAccessToken(token.jwt);
                window.location.href = '/';
                console.log(res)
                // setAccessToken(await hashPassword(identifier, password));
            } else {
                Swal.fire({
                    title: "อีเมล์หรือรหัสผ่านไม่ถูกต้อง!",
                    icon: "error",
                });
                // alert("อีเมล์หรือรหัสผ่านไม่ถูกต้อง!")
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
                            <Input
                                type="text"
                                id="identifier"
                                value={identifier}
                                label="อีเมล์"
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="name@gmail.com"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                label="รหัสผ่าน"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
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