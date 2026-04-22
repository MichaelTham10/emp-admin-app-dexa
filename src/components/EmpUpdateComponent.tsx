import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { empApi, GetEmployeeByEmpNoUrl, UpdateEmployeeByIdUrl } from '../constants/UrlConstans';
import { RequestUpdateEmployeeModel } from '../interfaces/Request/RequestUpdateEmployeeModel';
import { ResponseEmpProfile } from '../interfaces/Response/ResponseEmpProfile';
import { UpdEmpObj } from '../interfaces/General/UpdEmpObj';

export const EmpUpdateComponent = () => {
    const [formData, setFormData] = useState<UpdEmpObj>({
        phone: '',
        password: '',
        photo: null
    });

    const [empNo, setEmpNo] = useState('');

    const [empNoSub, setEmpNoSub] = useState('');


    const { data: emp, isLoading, isError, error } = useQuery<ResponseEmpProfile>({
        queryKey: ['profileEmpNo', empNoSub],
        queryFn: async () => {
            const { data } = await empApi.get<ResponseEmpProfile>(`${GetEmployeeByEmpNoUrl}/${empNo}`)
            return data
        },
        enabled: empNoSub.length > 0,
    })

    const { mutate: updateProfile, isPending } = useMutation<ResponseEmpProfile, Error, RequestUpdateEmployeeModel>({
        mutationFn: async (payload) => {
            const { data } = await empApi.patch<ResponseEmpProfile>(`${UpdateEmployeeByIdUrl}/${emp?.EmpId}`, payload)
            return data
        },
        onSuccess: (data) => {
            console.log(data);
            window.location.reload()
        },
    })

    const onSubmit = () => {
        // Photo submit will be using cloud storage url / local storage path
        updateProfile({
            password: formData.password,
            phoneNumber: formData.phone,
            photo: "AWS_URL_OR_LOCAL_PATH",
             ...(formData.photo && { photoSize: formData.photo.size }),
        });
    }

    const renderEditProfile = () => {
        if (emp) {
            return (
                <>
                    <h2 className="text-2xl font-bold mb-8 text-gray-800">Edit Profile</h2>
                    <form className="max-w-md space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Profile</label>
                            <input onChange={(input) => setFormData((prev) => ({
                                ...prev,
                                photo: input.target.files?.[0] || null
                            }))} type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone</label>
                            <input value={formData.phone} onChange={(input) => setFormData((prev) => ({
                                ...prev,
                                phone: input.target.value
                            }))} type="tel" placeholder="0812345678" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input value={formData.password} onChange={(input) => setFormData((prev) => ({
                                ...prev,
                                password: input.target.value
                            }))} type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <button onClick={onSubmit} disabled={isPending} type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg shadow-blue-200">
                            {isPending ? "Loading..." : "Simpan Data"}
                        </button>
                    </form>
                </>
            )
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{error.message}...</p>;

    return (
        <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 h-full">
                <div className="flex flex-wrap items-end gap-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Input Emp No</label>
                        <div className='flex gap-2'>
                            <input value={empNo} onChange={(input) => setEmpNo(input.target.value)} type="text" placeholder="Emp No" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            <button
                                onClick={() => setEmpNoSub(empNo)}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Search
                            </button>
                        </div>

                    </div>
                </div>
                {renderEditProfile()}
            </div>
        </div>
    );
};
