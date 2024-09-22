import React,{useState,useEffect,useContext} from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick-theme.css";
import PrescriptionTemplate from '../../components/dashboard/doctor/prescription/PrescriptionTemplate';
import SetRating from '../../models/dashboard/SetRating';
import { UserContext } from '../../services/auth/UserProvider';
const getId = (name) =>{
    if(!name) return null;
    const idMatch = name.match(/id:(\d+)/);
    if(idMatch && idMatch[1]){
      return idMatch[1];
  
    }
    return null;
  }
  const extractNameFromIdString = (name) => {
    // Split the string on the first space after "id:4"
    const nameParts = name.split(" ");
    
    // Remove the first part which contains "id:4"
    // Then join the rest back into a string (the name part)
    return nameParts.slice(1).join(" ");
  };
    

  
const PastRecord = ({ appointments }) => {
    const { user } = useContext(UserContext);
    const [exampleDataList, setExampleDataList] = useState([]);
    

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem("token");
  
          const response = await fetch(`http://localhost:8000/api/appointments/${user.userID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
  
          const data = await response.json();
  
          // Transform data to match the exampleDataList format
          const transformedData = data.map((appointment) => ({
            DoctorName: appointment.prescription?.doctor.name || "N/A",
            Specialization: appointment.prescription?.doctor.department.name || "N/A",
            PatientName: appointment.user.name,
            Diagnosis: appointment.concern,
            AppointmentDate: new Date(appointment.appointmentDateTime).toLocaleDateString(),
            medications: appointment.prescription?.prescribedMedicines
              ? appointment.prescription.prescribedMedicines.map((med) => ({
                  name: med.medicine.name,
                  duration: med.duration,
                  time: med.afterBefore,
                  frequency: med.quantity,
                }))
              : null,
          }));
  
          setExampleDataList(transformedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchAppointments();
    }, []);
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
                                        {appointment.status === 'pending' ? '-' : extractNameFromIdString(appointment.doctorName)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {(appointment.status === 'Prescribed' || appointment.status === 'Dispensed') && (
                                            <SetRating  doctorID={getId(appointment.doctorName)} />
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
                {exampleDataList.map((prescription, index) => (
                    <div key={index}>
                        <PrescriptionTemplate data={prescription} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PastRecord;
