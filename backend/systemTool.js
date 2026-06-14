import os from "os";
import si from "systeminformation";

export async function getSystemInfo() {
  const load = await si.currentLoad();
  const battery = await si.battery();

  return {
    cpu: load.currentLoad.toFixed(1),

    ram: (
      ((os.totalmem() - os.freemem()) /
        os.totalmem()) *
      100
    ).toFixed(1),

    battery: battery.hasBattery
      ? battery.percent
      : 100,
  };
}