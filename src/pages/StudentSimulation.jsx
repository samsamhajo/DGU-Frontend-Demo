import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const StudentSimulation = () => {
    const [graduated, setGraduated] = useState(false);
    const [data, setData] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedExcelFile, setUploadedExcelFile] = useState(null);
    const [uploadedPDFFile, setUploadedPDFFile] = useState(null);

    const [department, setDepartment] = useState('');
    const [studentId, setStudentId] = useState('');
    const [type, setType] = useState('');
    const [course, setCourse] = useState('');
    const [englishLevelTest, setEnglishLevelTest] = useState('');
    const [exceptionItems, setExceptionItems] = useState([]);
    const exceptionFileInputRefs = useRef({});

    const excelFileInputRef = useRef(null);
    const pdfFileInputRef = useRef(null);

    const [simulationResult, setSimulationResult] = useState('');
    const [rerunSimulation, setRerunSimulation] = useState(false); // 추가: 시뮬레이션 다시 실행 여부 상태

    const handleSimulation = () => {
        calculateSimulationResult();
        setGraduated(true); // 시뮬레이션 시작 버튼을 누르면 graduated를 true로 설정하여 결과를 표시합니다.
    };

    const handleRerunSimulation = () => {
        setGraduated(false); // graduated 값을 false로 설정하여 시뮬레이션을 다시 시작합니다.
        setRerunSimulation(true); // rerunSimulation 값을 true로 설정하여 시뮬레이션 결과를 숨기고 버튼을 숨깁니다.
    };


    const handleExcelUpload = (e) => {
        const file = e.target.files[0];
        const newUploadedFile = { name: file.name, id: Date.now() };
        const newUploadedFiles = [...uploadedFiles, newUploadedFile];
        setUploadedFiles(newUploadedFiles);
        readExcel(file);
        setUploadedExcelFile(file);
        excelFileInputRef.current.value = null;
    };

    const handlePDFUpload = (e) => {
        const file = e.target.files[0];
        const newUploadedFile = { name: file.name, id: Date.now() };
        setUploadedFiles((prevFiles) => [...prevFiles, newUploadedFile]);
        setUploadedPDFFile(file);
        pdfFileInputRef.current.value = null;
    };

    const handleFileDelete = (fileId) => {
        const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
        setUploadedFiles(updatedFiles);

        if (uploadedExcelFile && uploadedExcelFile.id === fileId) {
            setUploadedExcelFile(null);
        }

        if (uploadedPDFFile && uploadedPDFFile.id === fileId) {
            setUploadedPDFFile(null);
        }
    };

    const handleExceptionTypeChange = (e, itemId) => {
        const updatedItems = exceptionItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, type: e.target.value };
            }
            return item;
        });
        setExceptionItems(updatedItems);
    };

    const handleExceptionFileUpload = (e, itemId) => {
        const file = e.target.files[0];
        const updatedItems = exceptionItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, file: file, fileName: file.name };
            }
            return item;
        });
        setExceptionItems(updatedItems);
        exceptionFileInputRefs.current[itemId].value = null;
    };

    const handleAddException = () => {
        const newExceptionItem = { id: Date.now(), type: '', file: null, fileName: '' };
        setExceptionItems((prevItems) => [...prevItems, newExceptionItem]);
    };

    const handleRemoveException = (itemId) => {
        setExceptionItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const inputStyle = {
        marginRight: '8px',
    };

    const selectBoxStyle = {
        ...inputStyle,
        fontWeight: 'normal',
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

    const calculateSimulationResult = () => {
        const totalCredits = data.reduce((total, item) => {
            if (item.학점 !== '' && !isNaN(parseFloat(item.학점))) {
                return total + parseFloat(item.학점);
            }
            return total;
        }, 0);

        let requiredTotalCredits;
        let requiredMajorCredits

        if (course === "심화과정") {
            requiredTotalCredits = 140.0;
            requiredMajorCredits = 84.0;
        } else if (course === "일반과정") {
            requiredTotalCredits = 130.0;
            requiredMajorCredits = 72.0;
        }

        if (totalCredits < requiredTotalCredits) {
            setSimulationResult(
                <div style={{ color : 'red'}}>
                    전체학점의 총 합이 {totalCredits}점이라, {requiredTotalCredits}점을 충족하지 못합니다.
                    <br />
                </div>
            );
        } else {
            setSimulationResult(
                <div style={{color : 'green'}}>
                    전체학점의 총 합이 {requiredTotalCredits}점을 충족합니다.
                    <br />
                </div>
            );
        }

        // "공학 요소" 열의 내용이 "전공"인 학점의 합 계산
        const majorCredits = data.reduce((total, item) => {
            if (item.공학요소 === '전공' && item.학점 !== '' && !isNaN(parseFloat(item.학점))) {
                return total + parseFloat(item.학점);
            }
            return total;
        }, 0);

        if (majorCredits < 84.0) {
            // "공학 요소" 열의 내용이 "전공"인 학점의 합이 84점 미만인 경우 메세지를 설정합니다.
            setSimulationResult((prevResult) => (
                <>
                    {prevResult}
                    <br />
                    <span style={{ color: 'red'}}>전공 학점의 총 합이 {majorCredits}점이라, {requiredMajorCredits}점을 충족하지 못합니다.</span>
                    <br />
                </>
            ));
        } else {
            setSimulationResult((prevResult) => (
                <>
                    {prevResult}
                    <br />
                    <span style={{ color: 'green'}}> 전공학점의 총 합이 {requiredMajorCredits}점을 충족합니다.</span>
                    <br />
                </>
            ));
        }

        const coursesToCheck = [
            '계산적사고법',
            '미적분학및연습1',
            '공학선형대수학',
            '어드벤쳐디자인',
            '이산수학',
            '자료구조와실습',
            '확률및통계학',
            '컴퓨터구성',
            '시스템소프트웨어와실습',
            '공개SW프로젝트',
            '개별연구',
            '컴퓨터공학종합설계1',
            '컴퓨터공학종합설계2'
        ];
        
        const missingCourses = coursesToCheck.filter(course => !data.some(item => item.교과목명 === course));

        if (missingCourses.length > 0) {
            setSimulationResult((prevResult) => (
                <>
                    {prevResult}
                    <br />
                    <span style={{ color: 'red' }}>
                        필수 교과목 중 ({missingCourses.join(', ')})
                    </span>
                    <br />
                    <span style={{ color: 'red' }}>
                        을 이수하지 않았습니다.
                    </span>
                    <br />
                </>
            ));
        }


        const englishCourseCount = data.reduce((count, item) => {
            if (item.원어강의종류 === '영어') {
                return count + 1;
            }
            return count;
        }, 0);
    
        setSimulationResult((prevResult) => (
            <>
                {prevResult}
                <br />
                <span style={{ color: 'red' }}>
                    수강한 원어강의는 {englishCourseCount}개 입니다.
                </span>
                {englishCourseCount < 4 ? (
                    <span style={{ color: 'red' }}>
                        원어강의는 4개를 수강해야합니다.
                    </span>
                ) : null}
            </>
        ));
    };

    
// 선이수 과목( 필수과목 ), 영어 레벨에 따라 EAS 처리, 시뮬레이션 버튼 사라지지않게 계속 유지
// 유형과 과정에 따라서 판단 기준 다르게, 학과, 학번 , 유형, 과정, 영어 레벨 테스트 미입력시 시뮬 안돌림




    return (
        <div className="bg-white h-screen">
            <div className="container mx-auto h-screen">
                <div className="text-blue-500 flex flex-col items-start space-y-4 ml-4">
                    <div className="mb-2"></div>
                    <h1 className="text-2xl font-semibold text-black mb-2">졸업 판별 시뮬레이션</h1>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".xlsx, .xls, .csv"
                                onChange={handleExcelUpload}
                                ref={excelFileInputRef}
                            />
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                                onClick={() => excelFileInputRef.current.click()}
                            >
                                전체 성적표 업로드
                            </button>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".pdf"
                                onChange={handlePDFUpload}
                                ref={pdfFileInputRef}
                            />
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                                onClick={() => pdfFileInputRef.current.click()}
                            >
                                취득 분류표 업로드
                            </button>
                        </label>
                    </div>
                    <div className="mb-4"></div>
                    <div className="flex items-center space-x-1 text-black">
                        <label className="flex items-center font-bold">
                            <span className="mr-2">학과:</span>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="bg-white border border-gray-400 px-4 py-2 rounded-lg"
                                style={selectBoxStyle}
                            >
                                <option value="">학과 선택</option>
                                <option value="컴퓨터공학과">컴퓨터공학과</option>

                            </select>
                        </label>
                        <label className="flex items-center font-bold">
                            <span className="mr-2">학번:</span>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="bg-white border border-gray-400 px-4 py-2 rounded-lg"
                                style={{ width: '100px', ...inputStyle }}
                            />
                        </label>
                        <label className="flex items-center font-bold">
                            <span className="mr-2">과정:</span>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="bg-white border border-gray-400 px-4 py-2 rounded-lg"
                                style={selectBoxStyle}
                            >
                                <option value="">과정 선택</option>
                                <option value="심화과정">심화과정</option>
                                <option value="일반과정">일반과정</option>
                                {/* 다른 과정 옵션 추가 */}
                            </select>
                        </label>
                        <label className="flex items-center font-bold">
                            <span className="mr-2">영어 레벨테스트:</span>
                            <input
                                type="text"
                                value={englishLevelTest}
                                onChange={(e) => setEnglishLevelTest(e.target.value)}
                                className="bg-white border border-gray-400 px-4 py-2 rounded-lg"
                                style={{ width: '100px', ...inputStyle }}
                            />
                        </label>
                        <div className="mb-4"></div>
                    </div>
                    {uploadedFiles.length > 0 ? (
                        <div className="mt-4">
                            <h2 className="font-bold text-lg mb-2 text-black">파일 목록</h2>
                            <p className="mb-2 text-black">업로드된 파일: </p>
                            <ul>
                                {uploadedFiles.map((file) => (
                                    <li key={file.id} className="flex items-center">
                                        <span>{file.name}</span>
                                        <button className="ml-2 text-red-500" onClick={() => handleFileDelete(file.id)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p className="mb-2 text-black">업로드된 파일이 없습니다.</p>
                        </div>
                    )}
                </div>
                {data.length > 0 && (
                    <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                                    item.학점 !== '' && (
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
                )}
                {data.length > 0 && (
                    <div className="mt-4">
                        <h2 className="font-bold text-lg mb-2 text-black">예외사항</h2>
                        <div>
                            {exceptionItems.map((item) => (
                                <div key={item.id} className="mb-2">
                                    <div className="flex items-center mb-2">
                                        <label className="flex items-center font-bold">
                                            <span className="mr-2">유형:</span>
                                            <select
                                                value={item.type}
                                                onChange={(e) => handleExceptionTypeChange(e, item.id)}
                                                className="bg-white border border-gray-400 px-4 py-2 rounded-lg"
                                                style={selectBoxStyle}
                                            >
                                                <option value="">유형 선택</option>
                                                <option value="ipp">ipp</option>
                                                <option value="상장">상장</option>
                                                <option value="영어 성적">영어 성적</option>
                                                <option value="기타 서류">기타 서류</option>
                                                {/* 다른 유형 옵션 추가 */}
                                            </select>
                                        </label>
                                        <label className="flex items-center font-bold">
                                            <span className="mr-2">파일 업로드:</span>
                                            <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleExceptionFileUpload(e, item.id)}
                                                ref={(input) => (exceptionFileInputRefs.current[item.id] = input)}
                                            />
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                                                onClick={() => exceptionFileInputRefs.current[item.id].click()}
                                            >
                                                업로드
                                            </button>
                                            {item.fileName && <span className="ml-2">{item.fileName}</span>}
                                        </label>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200 ml-4"
                                            onClick={() => handleRemoveException(item.id)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-2">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                                    onClick={handleAddException}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-4"></div>
                {graduated ? (
                    <div className="mt-4 text-center">
                        <h2 className="font-bold text-lg mb-2 text-black">시뮬레이션 결과</h2>
                        <div className="text-black">{simulationResult}</div>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200 mt-4"
                            onClick={handleRerunSimulation} // 다시 시뮬레이션 버튼을 표시하고 결과를 숨깁니다.
                        >
                            결과 초기화
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-center">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition duration-200"
                            onClick={handleSimulation}
                        >
                            시뮬레이션 시작
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSimulation;
