import { ContainerModule, type interfaces } from "inversify";
import { RadarController } from "./controllers/radar.controller";
import { TargetCalculatorService } from "./services/target-calculator.service";

export const RadarModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<TargetCalculatorService>(TargetCalculatorService).toSelf().inSingletonScope();
  bind<RadarController>(RadarController).toSelf().inSingletonScope();
});
