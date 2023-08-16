import React, { useState } from 'react';

const Confirmation = () => {
    const [applicants, setApplicants] = useState([]); // 회원가입 신청자 목록
    const [acceptedApplicants, setAcceptedApplicants] = useState([]); // 수락된 신청자 목록

    const handleAccept = (applicant) => {
        // 신청자 수락 처리
        setAcceptedApplicants([...acceptedApplicants, applicant]);
        setApplicants(applicants.filter(a => a !== applicant));
    };

    const renderApplicants = (applicantList) => {
        return (
            <ul>
                {applicantList.map((applicant, index) => (
                    <li key={index}>
                        {applicant.username} ({applicant.email})
                        <button onClick={() => handleAccept(applicant)}>수락</button>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-white h-screen">
            <header className="bg-blue-500 py-4">
                <div className="container mx-auto">
                    <h1 className="text-white text-4xl font-bold">회원관리</h1>
                </div>
            </header>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">신청 목록</h2>
                {applicants.length === 0 ? <p>신청자 없음</p> : renderApplicants(applicants)}
                <h2 className="text-2xl font-bold mt-4 mb-4">수락 목록</h2>
                {acceptedApplicants.length === 0 ? <p>수락된 신청자 없음</p> : renderApplicants(acceptedApplicants)}
            </div>
        </div>
    );
};

export default Confirmation;