import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { AuditService } from "modules/audit/services/audit.service";
import { TargetCalculatorService } from "../services/target-calculator.service";
import { RADAR_ENDPOINT } from "../models/constants";
import type { Request, Response } from "express";

/**
 * @openapi
 * tags:
 *  name: Radar
 *  description: Manages HTTP requests and responses related to radar operations
 */
@controller(RADAR_ENDPOINT)
export class RadarController {
  public constructor(
    @inject(AuditService) private readonly _auditService: AuditService,
    @inject(TargetCalculatorService)
    private readonly _targetCalculatorService: TargetCalculatorService,
  ) {}

  /**
   * @openapi
   * /radar:
   *   post:
   *     summary: Handle radar scan request
   *     tags: [Radar]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               protocols:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: List of protocols to use for the scan
   *               scan:
   *                 type: object
   *                 description: Scan parameters
   *                 additionalProperties: true
   *             required:
   *               - protocols
   *               - scan
   *     responses:
   *       200:
   *         description: Successfully processed radar scan request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               description: The target calculated from the scan
   *               additionalProperties: true
   */
  @httpPost("/")
  public async handleRadar(req: Request, res: Response): Promise<void> {
    const { protocols, scan } = req.body;
    const target = this._targetCalculatorService.calculateTarget(protocols, scan);

    await this._auditService.create({ request: req.body, response: target });
    res.json(target);
  }
}
