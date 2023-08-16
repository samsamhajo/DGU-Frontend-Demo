import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-white h-screen">
            <header className="bg-blue-500 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/confirmation" className="text-white font-bold hover:underline">
                        회원관리
                    </Link>
                </div>
            </header>
            <div className="container mx-auto flex justify-center items-center h-screen">
                <div className="text-blue-500 flex flex-col items-center space-y-4">
                    <h1 className="text-4xl font-bold mb-4">DGU</h1>
                    <p className="text-xl font-bold text-black text-center">
                        환영합니다!<br />
                        이용하고자 하는 서비스를 클릭해주세요.
                    </p>
                    <div className="mt-4 flex space-x-4">
                        <Link to="/student-simulation" className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200">
                            학생
                        </Link>
                        <Link to="/login" className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition duration-200">
                            관리자
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
