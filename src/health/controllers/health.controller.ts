import { inject } from "inversify";
import { HealthService } from "health/services/health.service";
import { controller, httpGet } from "inversify-express-utils";
import { HEALTH_ENDPOINT } from "health/models/constants";
import type { Request, Response } from "express";

/**
 * @openapi
 * tags:
 *  name: Health
 *  description: Health check endpoint
 */
@controller(HEALTH_ENDPOINT)
export class HealthController {
  public constructor(@inject(HealthService) private readonly _healthService: HealthService) {}

  /**
   * @openapi
   * /health:
   *   get:
   *     summary: Check the health of the system
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: 🚀 Service is up and running... !
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  @httpGet("/")
  public check(_: Request, res: Response): void {
    const healthStatus = this._healthService.check();
    res.json(healthStatus);
  }
}
