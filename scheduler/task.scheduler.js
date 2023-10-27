import Task from "../models/task.js";

const minuteForSendReminder = 1;

export const taskScheduler = {
  reminderDeadline: async () => {
    const timeNow = Date.now();
    const tasks = await Task.findAll({
      where: {
        status: ["Todo", "Doing"],
      },
    });

    tasks.forEach((task) => {
      if (!task.deadline) {
        return;
      }

      const deadline = task.deadline.getTime();
      const diff = deadline - timeNow;
      const differentMinute = new Date(diff).getMinutes();

      //   console.log("belum", differentMinute);
      if (differentMinute == minuteForSendReminder) {
        console.log(task);
      }
    });
  },
};
