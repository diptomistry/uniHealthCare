package com.example.uniMed.apis.publics.duty_roster;



import java.time.DayOfWeek;
import java.util.List;

public class DutyRosterTableDTO {
    private Integer id;
    private String slotTime;
    private DayOfWeek dayOfWeek;
    private List<SlotDTO> slots;

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }
    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
    public List<SlotDTO> getSlots() {
        return slots;
    }
    public void setSlots(List<SlotDTO> slots) {
        this.slots = slots;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSlotTime() {
        return slotTime;
    }

    public void setSlotTime(String slotTime) {
        this.slotTime = slotTime;
    }

    public static class SlotDTO {
        private Integer id;
        private String slotTime;
        private List<DoctorDTO> doctors;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getSlotTime() {
            return slotTime;
        }

        public void setSlotTime(String slotTime) {
            this.slotTime = slotTime;
        }

        public List<DoctorDTO> getDoctors() {
            return doctors;
        }

        public void setDoctors(List<DoctorDTO> doctors) {
            this.doctors = doctors;
        }

        public static class DoctorDTO {
            private Integer id;
            private String name;

            public Integer getId() {
                return id;
            }

            public void setId(Integer id) {
                this.id = id;
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }
        }
    }
}