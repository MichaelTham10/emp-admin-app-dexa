import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AddEmpUrl, empApi, GetEmpPosition } from '../constants/UrlConstans';
import { ResponseEmpProfile } from '../interfaces/Response/ResponseEmpProfile';
import { RequestAddEmployee } from '../interfaces/Request/RequestAddEmployeeModel';
import { ResponseEmpPosition } from '../interfaces/Response/ResponseEmpPosition';
import { ResponsePagination } from '../interfaces/Response/ResponsePagination';

export const EmpAddComponent = () => {
    const [formData, setFormData] = useState<RequestAddEmployee>({
        phoneNumber: '',
        password: '',
        photo: '',
        email: '',
        empName: '',
        empNo: '',
        empPositionCode: '',
        photoSize: 0
    });

    const [photo, setPhoto] = useState<File | null>();

    const { data: empPos, isLoading, isError, error } = useQuery<ResponsePagination<ResponseEmpPosition[]>>({
        queryKey: ['profilePosition'],
        queryFn: async () => {
            const { data } = await empApi.get<ResponsePagination<ResponseEmpPosition[]>>(`${GetEmpPosition}`)
            return data
        },
    })


    const { mutate: createEmp, isPending } = useMutation<ResponseEmpProfile, Error, RequestAddEmployee>({
        mutationFn: async (payload) => {
            const { data } = await empApi.post<ResponseEmpProfile>(`${AddEmpUrl}`, payload)
            return data
        },
        onSuccess: (data) => {
            console.log(data);
            window.location.reload()
        },
    })

    const onSubmit = () => {
        // Photo submit will be using cloud storage url / local storage path
        createEmp({
            email: formData.email,
            empName: formData.empName,
            empNo: formData.empNo,
            empPositionCode: formData.empPositionCode,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            photo: "AWS_URL_OR_LOCAL_PATH",
            photoSize: photo ? photo.size : 0,
        });
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}...</p>;

    return (
        <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 h-full">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Add Employee</h2>
                <form className="max-w-md space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto Profile</label>
                        <input onChange={(input) => setPhoto(input.target.files?.[0] || null)} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input value={formData.email} onChange={(input) => setFormData((prev) => ({
                            ...prev,
                            email: input.target.value
                        }))} type="email" placeholder="mail@mail.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                        <input value={formData.empName} onChange={(input) => setFormData((prev) => ({
                            ...prev,
                            empName: input.target.value
                        }))} type="text" placeholder="Employee name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employee No</label>
                        <input value={formData.empNo} onChange={(input) => setFormData((prev) => ({
                            ...prev,
                            empNo: input.target.value
                        }))} type="text" placeholder="Employee no" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input value={formData.password} onChange={(input) => setFormData((prev) => ({
                            ...prev,
                            password: input.target.value
                        }))} type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone</label>
                        <input value={formData.phoneNumber} onChange={(input) => setFormData((prev) => ({
                            ...prev,
                            phoneNumber: input.target.value
                        }))} type="tel" placeholder="0812345678" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                        </label>
                        {empPos && empPos.data && empPos.data.length > 0 ?
                            <select
                                value={formData.empPositionCode}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        empPositionCode: e.target.value
                                    }))
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                {/* can be upgraded using pagination search bar */}
                                {empPos && empPos.data && empPos.data.length > 0 ?
                                    empPos.data.map(val => (
                                        <option value={val.EmpPositionCode}>{val.EmpPositionCode} - {val.EmpPositionName}</option>
                                    ))
                                    :
                                    <></>
                                }
                            </select>
                            :
                            <input value={"No Role Available"} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        }

                    </div>

                    <button onClick={onSubmit} disabled={isPending} type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg shadow-blue-200">
                        {isPending ? "Loading..." : "Simpan Data"}
                    </button>
                </form>
            </div>
        </div>
    );
};
