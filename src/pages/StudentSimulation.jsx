import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const StudentSimulation = () => {
    const [graduated, setGraduated] = useState(false);
    const [data, setData] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadedPdfFileName, setUploadedPdfFileName] = useState('');
    const [uploadedDocumentName, setUploadedDocumentName] = useState('');
        const [formRows, setFormRows] = useState([]); // Track dynamic form rows


    const handleSimulation = () => {
        setGraduated(true);
    };

    const handleExcelUpload = (e) => {
        const file = e.target.files[0];
        setUploadedFileName(file.name);
        readExcel(file);
    };

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        setUploadedPdfFileName(file.name);
    };

    const handleDocumentUpload = (e) => {
        const file = e.target.files[0];
        setUploadedDocumentName(file.name);
        // Handle the document upload logic here
    };

    const inputStyle = {
        marginRight: '8px',
    };

    const readExcel = async (file) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            if (!e.target) return;
            const bufferArray = e.target.result;
            const fileInformation = XLSX.read(bufferArray, {
                type: 'buffer',
                cellText: false,
                cellDates: true,
            });
            const sheetName = fileInformation.SheetNames[0];
            const rawData = fileInformation.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(rawData);
            setData(excelData);
        };
    };

    return (
        <div className="bg-white h-screen">
            <div className="container mx-auto h-screen">
                <div className="text-blue-500 flex flex-col items-start space-y-4 ml-4">
                    <div className="mb-2"></div>
                    <h1 className="text-2xl font-semibold text-black mb-2">졸업 판별 시뮬레이션</h1>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input type="file" style={{ display: 'none' }} onChange={handleExcelUpload} />
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200" onClick={() => document.querySelector('input[type=file]').click()}>
                                전체 성적표 업로드
                            </button>
                        </label>
                        <label className="flex items-center">
                            <input type="file" style={{ display: 'none' }} onChange={handlePdfUpload} />
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200" onClick={() => document.querySelector('input[type=file]').click()}>
                                취득 분류표 업로드
                            </button>
                        </label>
                    </div>
                    <div className="flex items-center space-x-1 text-black">
                        <span className="font-bold text-lg">학과</span>
                        <select className="border rounded-lg px-2 py-1" style={inputStyle}>
                            <option value="컴퓨터공학과">컴퓨터공학과</option>
                        </select>
                        <span className="font-bold text-lg">학번</span>
                        <input type="text" className="border rounded-lg px-2 py-1 w-24" style={inputStyle} />
                        <span className="font-bold text-lg">유형</span>
                        <select className="border rounded-lg px-2 py-1" style={inputStyle}>
                            <option value="심화과정">단일전공</option>
                            <option value="일반과정">복수전공</option>
                        </select>
                        <span className="font-bold text-lg">과정</span>
                        <select className="border rounded-lg px-2 py-1" style={inputStyle}>
                            <option value="심화과정">심화과정</option>
                            <option value="일반과정">일반과정</option>
                        </select>
                        <span className="font-bold text-lg">영어 레벨 테스트</span>
                        <input type="text" className="border rounded-lg px-2 py-1 w-24" style={inputStyle} />
                    </div>

                    <div className="mb-2">
                        <h2 className="font-bold text-lg mb-2 text-black">예외 사항 입력</h2>
                        <div className="flex items-center">
                            <select className="border rounded-lg px-2 py-1 text-black" style={{ marginRight: '8px' }}>
                                <option value="상장">상장</option>
                                <option value="학생증">학생증</option>
                                <option value="성적 증명서">성적 증명서</option>
                            </select>
                            <label className="flex items-center">
                            <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleDocumentUpload}
                                />
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200">
                                    서류 업로드
                                </button>
                            </label>
                        </div>
                        {uploadedDocumentName && (
                            <p className="text-black">업로드된 문서: {uploadedDocumentName}</p>
                        )}
                    </div>

                    {data.length > 0 ? (
                        <div className="mt-4">
                            <h2 className="font-bold text-lg mb-2 text-black">엑셀 데이터 도표</h2>
                            <p className="mb-2 text-black">업로드된 파일: {uploadedFileName}</p>
                            <table className="border">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">년도</th>
                                        <th className="border px-4 py-2">학기</th>
                                        <th className="border px-4 py-2">이수구분</th>
                                        <th className="border px-4 py-2">이수구분영역</th>
                                        <th className="border px-4 py-2">학수강좌번호</th>
                                        <th className="border px-4 py-2">교과목명</th>
                                        <th className="border px-4 py-2">담당교원</th>
                                        <th className="border px-4 py-2">학점</th>
                                        <th className="border px-4 py-2">등급</th>
                                        <th className="border px-4 py-2">공학인증</th>
                                        <th className="border px-4 py-2">삭제구분</th>
                                        <th className="border px-4 py-2">공학요소</th>
                                        <th className="border px-4 py-2">공학세부요소</th>
                                        <th className="border px-4 py-2">원어강의종류</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        item.학점 !== '' && item.등급 !== '' && (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{item.년도}</td>
                                                <td className="border px-4 py-2">{item.학기}</td>
                                                <td className="border px-4 py-2">{item.이수구분}</td>
                                                <td className="border px-4 py-2">{item.이수구분영역}</td>
                                                <td className="border px-4 py-2">{item.학수강좌번호}</td>
                                                <td className="border px-4 py-2">{item.교과목명}</td>
                                                <td className="border px-4 py-2">{item.담당교원}</td>
                                                <td className="border px-4 py-2">{item.학점}</td>
                                                <td className="border px-4 py-2">{item.등급}</td>
                                                <td className="border px-4 py-2">{item.공학인증}</td>
                                                <td className="border px-4 py-2">{item.삭제구분}</td>
                                                <td className="border px-4 py-2">{item.공학요소}</td>
                                                <td className="border px-4 py-2">{item.공학세부요소}</td>
                                                <td className="border px-4 py-2">{item.원어강의종류}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p className="mb-2 text-black">업로드된 파일: {uploadedFileName}</p>
                        </div>
                    )}

                    {uploadedPdfFileName && (
                        <div className="mt-4">
                            <h2 className="font-bold text-lg mb-2">업로드된 PDF 파일</h2>
                            <p className="mb-2 text-black">파일명: {uploadedPdfFileName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentSimulation;