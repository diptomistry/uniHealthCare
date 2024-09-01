import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick-theme.css";
import PrescriptionTemplate from '../../components/dashboard/doctor/prescription/PrescriptionTemplate';
import SetRating from '../../models/dashboard/SetRating';
const PastRecord = ({ appointments }) => {
    const exampleData1 = {
        AppointmentDate: "2024-08-31",
        PatientName: "John Doe",
        PhoneNum: "+1 123 456 7890",
        Email: "johndoe@example.com",
        Gender: "Male",
        Address: "1372 Payne Street Richlands, VA, 24641",
        Diagnosis: "Headache",
    };
    const exampleData2 = {
        AppointmentDate: "2024-08-31",
        PatientName: "Dianna Smith",
        PhoneNum: "+1 123 456 7890",
        Email: "johndoe@example.com",
        Gender: "Male",
        Address: "1372 Payne Street Richlands, VA, 24641",
        Diagnosis: "Fever",
    };
    const exampleData3 = {
        AppointmentDate: "2024-08-31",
        PatientName: "John Doe",
        PhoneNum: "+1 123 456 7890",
        Email: "johndoe@example.com",
        Gender: "Male",
        Address: "1372 Payne Street Richlands, VA, 24641",
        Diagnosis: "Cold",
    };

    const prescriptions = [exampleData1, exampleData2, exampleData3];

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={onClick}
            >
                <FaArrowRight className="text-gray-500 hover:text-gray-800" size={24} />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
                className="absolute top-1/2 -left-8 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={onClick}
            >
                <FaArrowLeft className="text-gray-500 hover:text-gray-800" size={24} />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Past Appointments</h2>
            {appointments && appointments.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {appointment.status === 'pending' ? '-' : appointment.doctorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {appointment.status === 'completed' && (
                                           <SetRating rating={0} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No past appointments found.</p>
            )}

            <h2 className="text-2xl font-bold mt-8 mb-4">Prescriptions</h2>
            <Slider {...settings}>
                {prescriptions.map((prescription, index) => (
                    <div key={index}>
                        <PrescriptionTemplate data={prescription} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PastRecord;
