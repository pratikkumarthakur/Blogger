"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Components/Header"; // Assuming you have a Headers component

const SecretKeyListener = () => {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "k") {
        setShowPrompt(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = () => {
    if (secretCode === "letmein123") {
      setShowPrompt(false);

      router.push("/auth/login");
    } else {
      alert("Wrong secret code 😅");
    }
  };

  return (
    <>
      {showPrompt && (
        <div className="h-screen fixed inset-0 w-full bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Enter Secret Code</h2>
            <input
              type="password"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              className="border px-3 py-2 rounded w-full mb-4"
              placeholder="Secret Code"
            />
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Unlock
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretKeyListener;
