import { ContainerModule, type interfaces } from "inversify";
import { AuditService } from "./services/audit.service";
import { AuditController } from "./controllers/audit.controller";

export const AuditModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuditService>(AuditService).toSelf().inSingletonScope();
  bind<AuditController>(AuditController).toSelf().inSingletonScope();
});
