import { v4 as uuidv4 } from "uuid";

export class doc1SlotGenerator {
  constructor() {
      this.workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      this.timeSlots = ['10-11', '11-12', '12-13', '14:30-15:30', '15:30-16:30'];
      this.timeSlotsData = this.generateTimeSlots();
  }

  generateTimeSlots() {
      const timeSlotsArr = [];
      const startDate = new Date(); // start from today
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 2); // end date is 2 months from today

      for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
          if (this.workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))) {
              const dateStr = i.toLocaleDateString('en-GB');
              const slots = this.timeSlots.map(slot => ({time: slot, available: true}));
              timeSlotsArr.push({ id: uuidv4(), date: dateStr, slots: slots });
          }
      }
      return timeSlotsArr;
  }
}

export class doc2SlotGenerator {
    constructor() {
        this.workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        this.timeSlots = ['10-11', '11-12', '12-13', '14:30-15:30', '15:30-16:30'];
        this.timeSlotsData = this.generateTimeSlots();
    }
  
    generateTimeSlots() {
        const timeSlotsArr = [];
        const startDate = new Date(); // start from today
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 2); // end date is 2 months from today
  
        for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            if (this.workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))) {
                const dateStr = i.toLocaleDateString('en-GB');
                const slots = this.timeSlots.map(slot => ({time: slot, available: true}));
                timeSlotsArr.push({ id: uuidv4(), date: dateStr, slots: slots });
            }
        }
        return timeSlotsArr;
    }
  }

