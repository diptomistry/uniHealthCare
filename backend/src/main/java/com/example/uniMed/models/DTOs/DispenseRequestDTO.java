package com.example.uniMed.models.DTOs;



import java.util.List;

public class DispenseRequestDTO {

    private Long appointmentId;
    private List<DispensedMedicineDTO> dispensedMedicines;

    // Getters and Setters
    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public List<DispensedMedicineDTO> getDispensedMedicines() {
        return dispensedMedicines;
    }

    public void setDispensedMedicines(List<DispensedMedicineDTO> dispensedMedicines) {
        this.dispensedMedicines = dispensedMedicines;
    }

    public static class DispensedMedicineDTO {
        private Long prescribedMedicineId;
        private Integer dispensedQuantity;

        // Getters and Setters
        public Long getPrescribedMedicineId() {
            return prescribedMedicineId;
        }

        public void setPrescribedMedicineId(Long prescribedMedicineId) {
            this.prescribedMedicineId = prescribedMedicineId;
        }

        public Integer getDispensedQuantity() {
            return dispensedQuantity;
        }

        public void setDispensedQuantity(Integer dispensedQuantity) {
            this.dispensedQuantity = dispensedQuantity;
        }
    }
}
